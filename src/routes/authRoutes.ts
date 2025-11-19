import {
  getMeController,
  loginController,
  registerController,
} from "@controllers/authController";
import express from "express";
import { protect } from "middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", protect, getMeController);

export default router;
