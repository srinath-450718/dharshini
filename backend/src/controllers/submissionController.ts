import { Request, Response } from "express";
import { Submission } from "../models/Submission.js";
import { getDbStatus } from "../config/database.js";
import { saveSubmissionToFile } from "../utils/fileStorage.js";

// Metadata mapping for all 7 questions
const REQUIRED_QUESTIONS: Record<
  "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7",
  { question: string; type: "mcq" | "text" }
> = {
  q1: {
    question: "What was your first impression of me?",
    type: "mcq",
  },
  q2: {
    question: "If I suddenly stopped talking to you, what would you feel?",
    type: "mcq",
  },
  q3: {
    question: "Which one describes me best in your life right now?",
    type: "mcq",
  },
  q4: {
    question: "What is something about me that you genuinely like, but have never actually told me?",
    type: "text",
  },
  q5: {
    question: "Do you think I treat you differently from the way I treat other people? If yes, what makes you feel that way?",
    type: "text",
  },
  q6: {
    question: "Have you ever wondered why I call you things like Lucky Charm, Muttabondaa, Princess, Bunny or Kalnenjakkaari, and why I care about the little things about you?",
    type: "text",
  },
  q7: {
    question: "Okay... be completely honest with me. When you think about me and the bond we have, what do you actually feel? What am I to you?",
    type: "text",
  },
};

// In-memory debounce cache to prevent duplicate double-click submissions
const recentSubmissions = new Map<string, number>();

export const createSubmission = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const rawBody = req.body || {};
    const extracted: Record<string, string> = {};

    // Support either answers array [{ questionId: 'q1', answer: '...' }] OR answers object { q1: '...' }
    if (Array.isArray(rawBody.answers)) {
      for (const item of rawBody.answers) {
        if (item && item.questionId && typeof item.answer === "string") {
          extracted[item.questionId] = item.answer.trim();
        }
      }
    } else if (rawBody.answers && typeof rawBody.answers === "object") {
      for (const [k, v] of Object.entries(rawBody.answers)) {
        if (typeof v === "string") {
          extracted[k] = v.trim();
        }
      }
    } else if (rawBody.q1) {
      for (const k of ["q1", "q2", "q3", "q4", "q5", "q6", "q7"]) {
        if (typeof rawBody[k] === "string") {
          extracted[k] = rawBody[k].trim();
        }
      }
    }

    // Strict validation: ALL 7 answers must be present and non-empty
    const questionKeys: ("q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7")[] = [
      "q1",
      "q2",
      "q3",
      "q4",
      "q5",
      "q6",
      "q7",
    ];

    for (const key of questionKeys) {
      const val = extracted[key];
      if (!val || typeof val !== "string" || val.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: `All seven answers are required. Missing or empty answer for ${key.toUpperCase()}.`,
        });
        return;
      }
    }

    // Format into normalized 7-item answers array with exact question titles and trimmed answers
    const normalizedAnswers = questionKeys.map((key) => ({
      questionId: key,
      questionType: REQUIRED_QUESTIONS[key].type,
      question: REQUIRED_QUESTIONS[key].question,
      answer: extracted[key].trim(),
    }));

    const clientIp =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.ip ||
      "unknown";

    // Generate fingerprint to prevent duplicate submissions within 10 seconds
    const fingerprint = JSON.stringify(normalizedAnswers.map((a) => a.answer));
    const now = Date.now();
    const lastSubmitTime = recentSubmissions.get(fingerprint);

    if (lastSubmitTime && now - lastSubmitTime < 10000) {
      res.status(429).json({
        success: false,
        message: "Submission already received. Please wait a moment.",
      });
      return;
    }
    recentSubmissions.set(fingerprint, now);

    // Clean up old cache entries periodically
    if (recentSubmissions.size > 100) {
      for (const [key, timestamp] of recentSubmissions.entries()) {
        if (now - timestamp > 60000) {
          recentSubmissions.delete(key);
        }
      }
    }

    // 1. Always persist to resilient local file storage immediately
    const savedItem = saveSubmissionToFile(normalizedAnswers, clientIp);

    // 2. If MongoDB is connected, also persist to MongoDB
    if (getDbStatus()) {
      try {
        await Submission.create({
          answers: normalizedAnswers,
          completed: true,
          ipHash: clientIp,
        });
        console.log(`[Submission] Successfully saved 7 answers to MongoDB.`);
      } catch (dbErr) {
        console.warn("[Submission] MongoDB write skipped, file saved:", dbErr);
      }
    }

    res.status(201).json({
      success: true,
      submissionId: savedItem.id,
      message: "Answers saved successfully.",
    });
  } catch (error) {
    console.error("[Submission] Error saving submission:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while saving your answers. Please try again.",
    });
  }
};
