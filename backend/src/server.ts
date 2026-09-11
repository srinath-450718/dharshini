import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import { connectDatabase, getDbStatus } from "./config/database.js";
import { initAdminUser } from "./utils/initAdmin.js";
import { submissionRouter } from "./routes/submissionRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";

// Load from current working directory or backend/.env
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), "backend/.env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Support CLIENT_ORIGIN (single/comma-separated) and CLIENT_ORIGINS (comma-separated)
const rawEnvOrigins = [
  process.env.CLIENT_ORIGIN,
  process.env.CLIENT_ORIGINS,
]
  .filter(Boolean)
  .join(",");

// Default origins always allowed for local development
const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const envOrigins = rawEnvOrigins
  .split(",")
  .map((o) => o.trim().replace(/\/+$/, ""))
  .filter(Boolean);

// Combine and deduplicate
const allowedOrigins = Array.from(
  new Set([...defaultOrigins, ...envOrigins])
);

// Trust first proxy for secure cookie and HTTPS detection in production (e.g. Render, Railway, Fly, Heroku)
app.set("trust proxy", 1);

// 1. Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible API operation with separate client
    crossOriginEmbedderPolicy: false,
  })
);

// 2. CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    const cleanOrigin = origin.trim().replace(/\/+$/, "");

    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    }

    // Reject any origin not in allowedOrigins
    return callback(new Error(`CORS blocked: Origin ${origin} is not allowed.`), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Pragma",
    "Expires",
    "X-Requested-With",
  ],
  optionsSuccessStatus: 200, // Preflight OPTIONS response status code for legacy browsers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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
    if (err instanceof Error && err.message.startsWith("CORS blocked")) {
      res.status(403).json({
        success: false,
        message: err.message,
      });
      return;
    }
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
  console.log(`[Server] Allowed client origin(s): ${allowedOrigins.join(", ")}`);
  const connected = await connectDatabase();
  if (connected) {
    await initAdminUser();
  }
});

export default app;
