import { Router } from "express";
import { createSubmission } from "../controllers/submissionController.js";
import { validateSubmission } from "../middleware/validation.js";

export const submissionRouter = Router();

// POST /api/submissions
submissionRouter.post("/", validateSubmission, createSubmission);
