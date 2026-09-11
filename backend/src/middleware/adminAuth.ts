import { Request, Response, NextFunction } from "express";
import { verifyToken, AdminPayload } from "../utils/session.js";
import { User } from "../models/User.js";
import { getDbStatus } from "../config/database.js";
import { getAdminConfig } from "../utils/initAdmin.js";

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

  const { email: configEmail } = getAdminConfig();

  // If primary admin or DB is disconnected, rely on validated JWT payload
  if (payload.userId === "admin_primary" || !getDbStatus()) {
    if (payload.email.toLowerCase() === configEmail.toLowerCase()) {
      req.admin = payload;
      next();
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
      // Fallback check against configured admin
      if (payload.email.toLowerCase() === configEmail.toLowerCase()) {
        req.admin = payload;
        next();
        return;
      }
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
    // If DB check fails but JWT was already verified by signature
    if (payload.email.toLowerCase() === configEmail.toLowerCase()) {
      req.admin = payload;
      next();
      return;
    }
    console.error("[Auth] User verification error:", err instanceof Error ? err.message : String(err));
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export const requireAdmin = adminAuth;
