import jwt from "jsonwebtoken";

export interface AdminPayload {
  userId: string;
  email: string;
  role: "admin";
}

// Fallback secret ensures backend does NOT crash with 500 if Render environment variable was missed
const FALLBACK_SECRET = "b98ad00c_secure_session_secret_sathya_2026";

const getSecret = (): string => {
  const secret = process.env.SESSION_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    console.warn(
      "[Security Notice] Neither SESSION_SECRET nor JWT_SECRET is set in environment! Using resilient fallback secret. Please add SESSION_SECRET in your Render dashboard environment variables."
    );
    return FALLBACK_SECRET;
  }
  return secret;
};

export const generateToken = (payload: AdminPayload): string => {
  const secret = getSecret();
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export const verifyToken = (token: string): AdminPayload | null => {
  const secret = getSecret();
  try {
    return jwt.verify(token, secret) as AdminPayload;
  } catch {
    return null;
  }
};
