import jwt from "jsonwebtoken";

export interface AdminPayload {
  userId: string;
  email: string;
  role: "admin";
}

export const generateToken = (payload: AdminPayload): string => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not defined in environment.");
  }
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export const verifyToken = (token: string): AdminPayload | null => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    return null;
  }
  try {
    return jwt.verify(token, secret) as AdminPayload;
  } catch {
    return null;
  }
};
