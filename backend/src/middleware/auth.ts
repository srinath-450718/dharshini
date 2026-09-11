import { Request, Response, NextFunction } from "express";
import { verifyToken, AdminPayload } from "../utils/session.js";

export interface AuthenticatedRequest extends Request {
  admin?: AdminPayload;
}

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
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
  if (!payload) {
    res.status(401).json({ success: false, message: "Invalid or expired session." });
    return;
  }

  req.admin = payload;
  next();
};
