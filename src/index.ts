import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { ConnectDb } from "@config/db";
import tradeRoutes from "@routes/tradeRoutes";
import authRoutes from "@routes/authRoutes";

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

// Routes
app.use("/api/trades", tradeRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
