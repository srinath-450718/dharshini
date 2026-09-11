import { Request, Response } from "express";
import { Submission } from "../models/Submission.js";
import { comparePassword } from "../utils/password.js";
import { generateToken, verifyToken } from "../utils/session.js";
import { AuthenticatedRequest } from "../middleware/auth.js";
import { connectDatabase, getDbStatus } from "../config/database.js";
import { getSubmissionsFromFile } from "../utils/fileStorage.js";

const COOKIE_NAME = "admin_token";

// MCQ Option Maps for Questions 1-3 to convert IDs (e.g. 'c') to full human-readable option text
const MCQ_OPTION_MAP: Record<string, Record<string, string>> = {
  q1: {
    a: "Quiet / Reserved",
    b: "Funny / Fun to be around",
    c: "Little bit annoying 😂",
    d: "Something about him caught my attention",
  },
  q2: {
    a: "Nothing much, honestly 😂",
    b: "I'd notice it, but that's it",
    c: "I'd actually miss talking to you",
    d: "I'd wonder what happened and probably come looking for you",
  },
  q3: {
    a: "Just someone I know",
    b: "A good friend",
    c: "Someone I have a special connection with",
    d: "Someone I can't really put into a category",
  },
};

// Rate limiter state: max 5 failed attempts per IP within 15 minutes
interface FailedAttemptInfo {
  count: number;
  firstAttempt: number;
}
const failedAttempts = new Map<string, FailedAttemptInfo>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;

const isRateLimited = (ip: string): boolean => {
  const record = failedAttempts.get(ip);
  if (!record) return false;
  if (Date.now() - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    failedAttempts.delete(ip);
    return false;
  }
  return record.count >= MAX_FAILED_ATTEMPTS;
};

const recordFailedAttempt = (ip: string) => {
  const record = failedAttempts.get(ip);
  const now = Date.now();
  if (!record || now - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    failedAttempts.set(ip, { count: 1, firstAttempt: now });
  } else {
    record.count += 1;
  }
};

const clearFailedAttempts = (ip: string) => {
  failedAttempts.delete(ip);
};

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "unknown";

    if (isRateLimited(clientIp)) {
      res.status(429).json({
        success: false,
        message: "Too many failed attempts. Please try again later.",
      });
      return;
    }

    const { email, password, username } = req.body;
    const inputIdentifier = (email || username || "").trim().toLowerCase();

    const expectedEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const expectedUsername = (process.env.ADMIN_USERNAME || "").trim().toLowerCase();
    const expectedHash = process.env.ADMIN_PASSWORD_HASH;

    if ((!expectedEmail && !expectedUsername) || !expectedHash) {
      console.error("[Admin] ADMIN_EMAIL / ADMIN_PASSWORD_HASH not configured on server.");
      res.status(500).json({
        success: false,
        message: "Admin authentication is not configured on the server.",
      });
      return;
    }

    if (!inputIdentifier || !password) {
      recordFailedAttempt(clientIp);
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    // Email validation & matching
    const emailMatches = expectedEmail && inputIdentifier === expectedEmail;
    const usernameMatches = expectedUsername && inputIdentifier === expectedUsername;

    if (!emailMatches && !usernameMatches) {
      recordFailedAttempt(clientIp);
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    // Password verification via bcrypt
    const isMatch = await comparePassword(password, expectedHash);
    if (!isMatch) {
      recordFailedAttempt(clientIp);
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    // Success: clear rate limiter for this IP
    clearFailedAttempts(clientIp);

    // Issue HTTP-only cookie
    const token = generateToken({ email: inputIdentifier, role: "admin" });
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: "Authentication successful.",
    });
  } catch (error) {
    console.error("[Admin] Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during login.",
    });
  }
};

export const adminLogout = (_req: Request, res: Response): void => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });
  res.json({ success: true, message: "Logged out successfully." });
};

export const getAdminSession = (req: Request, res: Response): void => {
  const cookieToken = req.cookies?.admin_token;
  const headerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  const token = cookieToken || headerToken;

  if (!token) {
    res.json({ authenticated: false });
    return;
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") {
    res.json({ authenticated: false });
    return;
  }

  // Strictly return only authenticated: true, no sensitive secrets or database info
  res.json({
    authenticated: true,
  });
};

export const getSubmissions = async (
  _req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    // Strictly prevent browser or proxy caching of private answer data
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    let rawList: any[] = [];

    // 1. If MongoDB is connected, attempt to fetch from MongoDB
    if (getDbStatus()) {
      try {
        const mongoSubs = await Submission.find({ completed: true })
          .sort({ createdAt: -1 })
          .lean();
        if (Array.isArray(mongoSubs) && mongoSubs.length > 0) {
          rawList = mongoSubs.map((s) => ({
            id: s._id.toString(),
            answers: s.answers,
            completed: s.completed,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt,
          }));
        }
      } catch (mongoErr) {
        console.warn("[Admin] MongoDB query error, falling back to local file storage:", mongoErr);
      }
    }

    // 2. If MongoDB yielded no items or is disconnected, load from local file storage
    if (rawList.length === 0) {
      const fileSubs = getSubmissionsFromFile();
      if (Array.isArray(fileSubs) && fileSubs.length > 0) {
        rawList = fileSubs.map((s) => ({
          id: s.id || s._id || "sub-" + Math.random().toString(36).substring(2, 9),
          answers: s.answers || [],
          completed: s.completed ?? true,
          createdAt: s.createdAt || new Date().toISOString(),
          updatedAt: s.updatedAt || s.createdAt || new Date().toISOString(),
        }));
      }
    }

    // 3. Transform and map MCQ answer IDs to their full human-readable option labels
    const submissions = rawList.map((sub) => {
      const formattedAnswers = (sub.answers || []).map((ans: any) => {
        let fullAnswer = ans.answer || "";
        const qId = (ans.questionId || "").toLowerCase();

        if (MCQ_OPTION_MAP[qId]) {
          const key = (ans.answer || "").trim().toLowerCase();
          if (MCQ_OPTION_MAP[qId][key]) {
            fullAnswer = MCQ_OPTION_MAP[qId][key];
          }
        }

        return {
          questionId: ans.questionId,
          questionType: ans.questionType,
          question: ans.question,
          answer: fullAnswer,
        };
      });

      return {
        id: sub.id,
        completed: sub.completed,
        createdAt: sub.createdAt,
        updatedAt: sub.updatedAt,
        answers: formattedAnswers,
      };
    });

    res.json({
      success: true,
      count: submissions.length,
      submissions,
      submission: submissions[0] || null,
    });
  } catch (error) {
    console.error("[Admin] Error retrieving submissions:", error);
    // Never fail with 500: always return a valid 200 payload even on unexpected error
    res.json({
      success: true,
      count: 0,
      submissions: [],
      submission: null,
    });
  }
};
