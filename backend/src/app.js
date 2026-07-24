import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Import middleware
import {
  corsOptions,
  helmetOptions,
  sanitizeInput,
} from "./middleware/security.js";
import { globalErrorHandler, notFound } from "./middleware/errorHandler.js";
import { ensureUploadsDir } from "./middleware/upload.js";

// Import routes
import appRoutes from "./modules/app.routes.js";

const app = express();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
ensureUploadsDir();

// Serve static files (uploaded images)
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

// Health check (outside CORS)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Security middleware
app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(sanitizeInput);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// API routes
app.use("/api", appRoutes);

// Handle unhandled routes
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
