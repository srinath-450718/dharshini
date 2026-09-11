import mongoose, { Schema, Document } from "mongoose";

export interface IAnswer {
  questionId: "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7";
  questionType: "mcq" | "text";
  question: string;
  answer: string;
}

export interface ISubmission extends Document {
  answers: IAnswer[];
  completed: boolean;
  ipHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>(
  {
    questionId: {
      type: String,
      required: true,
      enum: ["q1", "q2", "q3", "q4", "q5", "q6", "q7"],
    },
    questionType: {
      type: String,
      required: true,
      enum: ["mcq", "text"],
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const SubmissionSchema = new Schema<ISubmission>(
  {
    answers: {
      type: [AnswerSchema],
      required: true,
      validate: {
        validator: function (val: IAnswer[]) {
          return Array.isArray(val) && val.length === 7;
        },
        message: "Submission must contain exactly 7 answers.",
      },
    },
    completed: {
      type: Boolean,
      default: true,
    },
    ipHash: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Submission = mongoose.model<ISubmission>(
  "Submission",
  SubmissionSchema
);
