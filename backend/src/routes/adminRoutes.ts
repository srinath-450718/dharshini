import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  getAdminSession,
  getSubmissions,
} from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/auth.js";

export const adminRouter = Router();

// Public login & logout
adminRouter.post("/login", adminLogin);
adminRouter.post("/logout", adminLogout);

// Session check (returns { authenticated: true } or { authenticated: false })
adminRouter.get("/session", getAdminSession);

// Protected private responses (requires valid HTTP-only cookie session)
adminRouter.get("/submissions", requireAdmin, getSubmissions);
