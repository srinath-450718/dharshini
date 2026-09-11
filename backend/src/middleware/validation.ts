import { Request, Response, NextFunction } from "express";

const VALID_MCQ_OPTIONS = ["a", "b", "c", "d"];
const EXPECTED_QUESTION_IDS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];

export const validateSubmission = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { answers } = req.body;

  if (!Array.isArray(answers)) {
    res.status(400).json({
      success: false,
      message: "Answers array is required.",
    });
    return;
  }

  if (answers.length !== 7) {
    res.status(400).json({
      success: false,
      message: "Submission must contain exactly 7 answers.",
    });
    return;
  }

  const seenIds = new Set<string>();

  for (const item of answers) {
    if (!item || typeof item !== "object") {
      res.status(400).json({
        success: false,
        message: "Invalid answer structure.",
      });
      return;
    }

    const { questionId, questionType, question, answer } = item;

    if (!EXPECTED_QUESTION_IDS.includes(questionId)) {
      res.status(400).json({
        success: false,
        message: `Unexpected question ID: ${questionId}`,
      });
      return;
    }

    if (seenIds.has(questionId)) {
      res.status(400).json({
        success: false,
        message: `Duplicate answer for question ID: ${questionId}`,
      });
      return;
    }
    seenIds.add(questionId);

    if (typeof question !== "string" || !question.trim()) {
      res.status(400).json({
        success: false,
        message: `Question text required for ${questionId}.`,
      });
      return;
    }

    if (typeof answer !== "string") {
      res.status(400).json({
        success: false,
        message: `Answer must be a string for ${questionId}.`,
      });
      return;
    }

    const trimmedAnswer = answer.trim();
    if (!trimmedAnswer) {
      res.status(400).json({
        success: false,
        message: `Answer cannot be empty or whitespace for ${questionId}.`,
      });
      return;
    }

    // MCQ specific validation (q1, q2, q3)
    if (["q1", "q2", "q3"].includes(questionId)) {
      if (questionType !== "mcq") {
        res.status(400).json({
          success: false,
          message: `Expected MCQ type for ${questionId}.`,
        });
        return;
      }
      if (!VALID_MCQ_OPTIONS.includes(trimmedAnswer.toLowerCase())) {
        res.status(400).json({
          success: false,
          message: `Invalid option '${trimmedAnswer}' for ${questionId}. Must be a, b, c, or d.`,
        });
        return;
      }
    }

    // Text specific validation (q4, q5, q6, q7)
    if (["q4", "q5", "q6", "q7"].includes(questionId)) {
      if (questionType !== "text") {
        res.status(400).json({
          success: false,
          message: `Expected text type for ${questionId}.`,
        });
        return;
      }

      const maxLength = questionId === "q7" ? 1500 : 1000;
      if (trimmedAnswer.length > maxLength) {
        res.status(400).json({
          success: false,
          message: `Answer for ${questionId} exceeds max length of ${maxLength} characters.`,
        });
        return;
      }
    }
  }

  // Ensure all expected question IDs are present
  for (const expectedId of EXPECTED_QUESTION_IDS) {
    if (!seenIds.has(expectedId)) {
      res.status(400).json({
        success: false,
        message: `Missing answer for ${expectedId}.`,
      });
      return;
    }
  }

  next();
};
