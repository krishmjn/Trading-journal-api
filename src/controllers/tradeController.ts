import Trade from "@models/Trade";
import { Request, Response } from "express";

//get all trades

export const getTrades = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const trades = await Trade.find({ userId });
  res.json(trades);
};

//get trade by id

export const getTradeById = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const trade = await Trade.findOne({ _id: req.params.id, userId });
  if (!trade) res.status(404).send({ message: "Trade not found" });
  res.json(trade);
};

// post create trade

export const createTrade = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const setupImage = req?.file?.path;
  const trade = new Trade({ ...req.body, setupImage, userId });
  const savedTrade = await trade.save();
  res.status(201).json(savedTrade);
};

//update trade by id

export const updateTrade = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const setupImage = req?.file?.path;
  const updateData = { ...req.body, setupImage };
  const updateTrade = await Trade.findByIdAndUpdate(
    { _id: req.params.id, userId },
    updateData,
    {
      new: true,
    }
  );
  if (!updateTrade) res.status(404).send({ message: "Trade not found" });
  res.json(updateTrade);
};

//delete trade by id

export const deleteTrade = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const deleteTrade = await Trade.findOneAndDelete({
    _id: req.params.id,
    userId,
  });
  if (!deleteTrade) res.status(404).send({ message: "Trade not found" });
  res.json({ message: "Trade deleted successfully" });
};
