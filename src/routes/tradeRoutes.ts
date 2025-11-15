import express from "express";
import {
  createTrade,
  deleteTrade,
  getTradeById,
  getTrades,
  updateTrade,
} from "@controllers/tradeController";
import { protect } from "middlewares/authMiddleware";

const router = express.Router();

router.use(protect);

router.route("/").get(getTrades).post(createTrade);

router.route("/:id").get(getTradeById).put(updateTrade).delete(deleteTrade);

export default router;
