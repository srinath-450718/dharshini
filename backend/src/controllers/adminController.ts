import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { Submission } from "../models/Submission.js";
import { generateToken, verifyToken } from "../utils/session.js";
import { AuthenticatedRequest } from "../middleware/adminAuth.js";
import { connectDatabase, getDbStatus } from "../config/database.js";
import { getSubmissionsFromFile } from "../utils/fileStorage.js";
import { getAdminConfig } from "../utils/initAdmin.js";

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

export const getAdminCookieOptions = (req: Request) => {
  const isProduction =
    process.env.NODE_ENV === "production" ||
    req.secure ||
    req.headers["x-forwarded-proto"] === "https" ||
    Boolean(process.env.RENDER) ||
    Boolean(process.env.CLIENT_ORIGIN && !process.env.CLIENT_ORIGIN.includes("localhost")) ||
    Boolean(process.env.CLIENT_ORIGINS && !process.env.CLIENT_ORIGINS.includes("localhost"));

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
    path: "/",
  };
};

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  const clientIp =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.ip ||
    "unknown";

  const { email, password, username } = req.body || {};
  const inputIdentifier = (email || username || "").trim().toLowerCase();

  try {
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        success: false,
        message: "Too many failed attempts. Please try again later.",
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

    const { email: configAdminEmail, password: configAdminPassword } = getAdminConfig();

    let user = null;

    // 1. Check MongoDB connection or attempt reconnect
    if (!getDbStatus()) {
      console.warn("[Admin Login] MongoDB not connected; attempting reconnect...");
      await connectDatabase();
    }

    // 2. Query MongoDB for admin user if connected
    if (getDbStatus()) {
      try {
        user = await User.findOne({ email: inputIdentifier }).select("+passwordHash");
      } catch (dbErr) {
        console.error(
          "[Admin Login] MongoDB query error:",
          dbErr instanceof Error ? dbErr.message : String(dbErr)
        );
      }
    }

    let isMatch = false;
    let authenticatedUserId = "admin_primary";
    let authenticatedEmail = inputIdentifier;

    if (user && user.role === "admin" && user.passwordHash) {
      // Compare password with bcrypt against DB record
      isMatch = await bcrypt.compare(password, user.passwordHash);
      authenticatedUserId = user._id.toString();
      authenticatedEmail = user.email;
    } else {
      // Resilient fallback: Compare against configured admin credentials
      if (inputIdentifier === configAdminEmail) {
        isMatch = password === configAdminPassword;
        authenticatedUserId = "admin_primary";
        authenticatedEmail = configAdminEmail;

        // If DB is connected, asynchronously create/sync admin in DB
        if (isMatch && getDbStatus()) {
          bcrypt.hash(configAdminPassword, 10).then((hash) => {
            User.create({ email: configAdminEmail, passwordHash: hash, role: "admin" }).catch(() => {});
          });
        }
      }
    }

    if (!isMatch) {
      recordFailedAttempt(clientIp);
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    // Success: clear failed attempts
    clearFailedAttempts(clientIp);

    // Create JWT
    const token = generateToken({
      userId: authenticatedUserId,
      email: authenticatedEmail,
      role: "admin",
    });

    // Store JWT in secure HTTP-only cookie
    const cookieOpts = getAdminCookieOptions(req);
    res.cookie(COOKIE_NAME, token, {
      ...cookieOpts,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: "Authentication successful.",
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    // Safe logging without passwords, tokens, or DB credentials
    console.error(
      `[Admin Login Failure] Identifier: ${inputIdentifier ? inputIdentifier.slice(0, 3) + "***" : "none"} | IP: ${clientIp} | Reason: ${errorMsg} | DB Connected: ${getDbStatus()} | Secret Defined: ${Boolean(process.env.SESSION_SECRET || process.env.JWT_SECRET)}`
    );
    res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }
};

export const adminLogout = (req: Request, res: Response): void => {
  const cookieOpts = getAdminCookieOptions(req);
  res.clearCookie(COOKIE_NAME, {
    httpOnly: cookieOpts.httpOnly,
    secure: cookieOpts.secure,
    sameSite: cookieOpts.sameSite,
    path: cookieOpts.path,
  });
  res.json({ success: true, message: "Logged out successfully." });
};

export const getAdminSession = async (req: Request, res: Response): Promise<void> => {
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

  const { email: configAdminEmail } = getAdminConfig();

  // If primary admin or DB is disconnected, rely on validated JWT payload
  if (payload.userId === "admin_primary" || !getDbStatus()) {
    if (payload.email.toLowerCase() === configAdminEmail) {
      res.json({
        authenticated: true,
        user: {
          email: payload.email,
          role: "admin",
        },
      });
      return;
    }
  }

  try {
    let user = null;
    if (payload.userId && payload.userId !== "admin_primary") {
      user = await User.findById(payload.userId);
    } else if (payload.email) {
      user = await User.findOne({ email: payload.email.toLowerCase() });
    }

    if (!user || user.role !== "admin") {
      if (payload.email.toLowerCase() === configAdminEmail) {
        res.json({
          authenticated: true,
          user: {
            email: payload.email,
            role: "admin",
          },
        });
        return;
      }
      res.json({ authenticated: false });
      return;
    }

    // Never return password, passwordHash, or JWT
    res.json({
      authenticated: true,
      user: {
        email: user.email,
        role: "admin",
      },
    });
  } catch {
    if (payload.email.toLowerCase() === configAdminEmail) {
      res.json({
        authenticated: true,
        user: {
          email: payload.email,
          role: "admin",
        },
      });
      return;
    }
    res.json({ authenticated: false });
  }
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
    res.json({
      success: true,
      count: 0,
      submissions: [],
      submission: null,
    });
  }
};
