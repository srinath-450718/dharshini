import { Request, Response, NextFunction } from "express";
import { verifyToken, AdminPayload } from "../utils/session.js";
import { User } from "../models/User.js";

export interface AuthenticatedRequest extends Request {
  admin?: AdminPayload;
}

export const adminAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const cookieToken = req.cookies?.admin_token;
  const headerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  const token = cookieToken || headerToken;

  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    let user = null;
    if (payload.userId) {
      user = await User.findById(payload.userId);
    } else if (payload.email) {
      user = await User.findOne({ email: payload.email.toLowerCase() });
    }

    if (!user || user.role !== "admin") {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    req.admin = {
      userId: user._id.toString(),
      email: user.email,
      role: "admin",
    };
    next();
  } catch (err) {
    console.error("[Auth] User verification failed:", err);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export const requireAdmin = adminAuth;
