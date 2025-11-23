import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDb } from "@config/db";
import tradeRoutes from "@routes/tradeRoutes";
import authRoutes from "@routes/authRoutes";
import { errorHandler } from "middlewares/errorHandler";

dotenv.config();
ConnectDb();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS must be FIRST
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body parser AFTER CORS
app.use(express.json());
// 3. Add a test route to verify server is working
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/trades", tradeRoutes);
app.use("/api/auth", authRoutes);

// Error handler LAST
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
