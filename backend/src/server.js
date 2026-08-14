import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.config.js";
import connectDB from "./config/db.config.js";
import authRouter from "./routes/auth.route.js";

const app = express();

/* ================================
            MIDDLEWARE
================================ */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

/* ================================
              ROUTES
================================ */

// Connect Database
await connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.use("/api/v1/auth",authRouter);

/* ================================
        GLOBAL ERROR HANDLER
================================ */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ================================
            START SERVER
================================ */

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
