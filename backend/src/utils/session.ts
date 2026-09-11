import jwt from "jsonwebtoken";

const DEFAULT_SECRET = "fallback-secret-development-only-change-in-production";

export interface AdminPayload {
  email: string;
  role: "admin";
}

export const generateToken = (payload: AdminPayload): string => {
  const secret = process.env.SESSION_SECRET || DEFAULT_SECRET;
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export const verifyToken = (token: string): AdminPayload | null => {
  const secret = process.env.SESSION_SECRET || DEFAULT_SECRET;
  try {
    return jwt.verify(token, secret) as AdminPayload;
  } catch {
    return null;
  }
};
