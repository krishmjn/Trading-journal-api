import express from "express";
import {
  createStrategy,
  deleteStrategy,
  getStrategyById,
  getStrategies,
  updateStrategy,
} from "@controllers/strategyController";
import { protect } from "middlewares/authMiddleware";

const router = express.Router();

router.use(protect);

router.route("/").get(getStrategies).post(createStrategy);

router
  .route("/:id")
  .get(getStrategyById)
  .put(updateStrategy)
  .delete(deleteStrategy);

export default router;
