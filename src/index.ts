import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDb } from "@config/db";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3232;

//middlewares
app.use(cors());
app.use(express.json());

ConnectDb();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
