import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import { connectDatabase, getDbStatus } from "./config/database.js";
import { submissionRouter } from "./routes/submissionRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";

// Load from current working directory or backend/.env
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), "backend/.env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const allowedOrigins = CLIENT_ORIGIN.split(",").map((o) => o.trim());

// Trust first proxy for secure cookie and HTTPS detection in production (e.g. Render, Railway, Fly, Heroku)
app.set("trust proxy", 1);

// 1. Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible API operation with separate client
    crossOriginEmbedderPolicy: false,
  })
);

// 2. CORS configuration (explicit origin matching, supports comma-separated list, credentials allowed)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // Check explicit allowedOrigins
      if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }

      // In local development, also allow localhost / 127.0.0.1 / private LAN IPs (172.*, 192.168.*, 10.*)
      if (process.env.NODE_ENV !== "production") {
        try {
          const parsed = new URL(origin);
          if (
            parsed.hostname === "localhost" ||
            parsed.hostname === "127.0.0.1" ||
            /^172\.(1[6-9]|2\d|3[01])\./.test(parsed.hostname) ||
            /^192\.168\./.test(parsed.hostname) ||
            /^10\./.test(parsed.hostname)
          ) {
            return callback(null, true);
          }
        } catch {}
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Pragma",
      "Expires",
      "X-Requested-With",
    ],
  })
);

// 3. Body parsers & cookies
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());

// 4. API Routes
app.use("/api/submissions", submissionRouter);
app.use("/api/admin", adminRouter);

// 5. Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: getDbStatus() ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// 6. Global error handler
app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("[Server Error]", err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
);

// Start server
app.listen(PORT, async () => {
  console.log(`[Server] Express backend running on http://localhost:${PORT}`);
  console.log(`[Server] Allowed client origin: ${CLIENT_ORIGIN}`);
  await connectDatabase();
});

export default app;
