import express from "express";
import {
  createTrade,
  deleteTrade,
  getTradeById,
  getTrades,
  updateTrade,
} from "@controllers/tradeController";
import { protect } from "middlewares/authMiddleware";
import upload from "@config/multer";

const router = express.Router();

router.use(protect);

router.route("/").get(getTrades).post(upload.single("setupImage"), createTrade);

router
  .route("/:id")
  .get(getTradeById)
  .put(upload.single("setupImage"), updateTrade)
  .delete(deleteTrade);

export default router;
