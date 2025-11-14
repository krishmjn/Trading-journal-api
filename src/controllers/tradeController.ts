import Trade from "@models/Trade";
import { Request, Response } from "express";

//get all trades

export const getTrades = async (req: Request, res: Response) => {
  const trades = await Trade.find();
  res.json(trades);
};

//get trade by id

export const getTradeById = async (req: Request, res: Response) => {
  const trade = await Trade.findById(req.params.id);
  if (!trade) res.status(404).send({ message: "Trade not found" });
  res.json(trade);
};

// post create trade

export const createTrade = async (req: Request, res: Response) => {
  const trade = new Trade(req.body);
  const savedTrade = await trade.save();
  res.status(201).json(savedTrade);
};

//update trade by id

export const updateTrade = async (req: Request, res: Response) => {
  const updateTrade = await Trade.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updateTrade) res.status(404).send({ message: "Trade not found" });
  res.json(updateTrade);
};

//delete trade by id

export const deleteTrade = async (req: Request, res: Response) => {
  const deleteTrade = await Trade.findByIdAndDelete(req.params.id);
  if (!deleteTrade) res.status(404).send({ message: "Trade not found" });
  res.json({ message: "Trade deleted successfully" });
};
