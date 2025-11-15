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
const PORT = process.env.PORT || 3232;

//middlewares
app.use(cors());
app.use(express.json());

app.use("api/trades", tradeRoutes);
app.use("api/auth", authRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
