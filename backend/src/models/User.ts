import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // Never return passwordHash in queries unless explicitly requested with +passwordHash
    },
    role: {
      type: String,
      required: true,
      default: "admin",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Extra safety: ensure passwordHash and __v are stripped whenever serialized to JSON
UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const record = ret as unknown as Record<string, unknown>;
    delete record.passwordHash;
    delete record.__v;
    return record;
  },
});

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
