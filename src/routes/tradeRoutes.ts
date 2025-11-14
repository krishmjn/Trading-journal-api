import {
  createTrade,
  deleteTrade,
  getTradeById,
  getTrades,
  updateTrade,
} from "@controllers/tradeController";
import express from "express";

const router = express.Router();

router.route("/").get(getTrades).post(createTrade);

router.route("/:id").get(getTradeById).put(updateTrade).delete(deleteTrade);

export default router;
