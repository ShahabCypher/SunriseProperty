import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Import middleware
import {
  corsOptions,
  helmetOptions,
  sanitizeInput,
} from "./middleware/security.js";
import { globalErrorHandler, notFound } from "./middleware/errorHandler.js";

// Import routes
import appRoutes from "./modules/app.routes.js";

const app = express();

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
