import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { ConnectDb } from "@config/db";
import tradeRoutes from "@routes/tradeRoutes";
import authRoutes from "@routes/authRoutes";
import strategyRoutes from "@routes/strategyRoutes";

ConnectDb();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://trading-journal-ui.vercel.app",
    "https://trading-journal-ui-git-main-krishmjns-projects.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// CORS must be FIRST
app.use(cors(corsOptions));

// Body parser AFTER CORS
app.use(express.json());

// Routes
app.use("/api/trades", tradeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/strategies", strategyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
