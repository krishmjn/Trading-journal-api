import Trade from "@models/Trade";
import { Request, Response } from "express";

//get all trades

export const getTrades = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const trades = await Trade.find({ userId });
    res.json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: (error as Error).message });
  }
};

//get trade by id

export const getTradeById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const trade = await Trade.findOne({ _id: req.params.id, userId });
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }
    res.json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: (error as Error).message });
  }
};

// post create trade

export const createTrade = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const setupImage = req.file?.path;

    // Basic check for file upload, as it's handled by multer and won't be in req.body
    if (!setupImage) {
      return res.status(400).json({
        message: "Validation failed",
        errors: { setupImage: { message: "Setup image is required." } },
      });
    }

    const trade = new Trade({ ...req.body, setupImage, userId });
    const savedTrade = await trade.save();
    res.status(201).json(savedTrade);
  } catch (error: any) {
    // Mongoose validation error
    if (error.name === "ValidationError") {
      const errors: { [key: string]: { message: string } } = {};
      for (const field in error.errors) {
        errors[field] = { message: error.errors[field].message };
      }
      return res
        .status(400)
        .json({ message: "Validation failed", errors });
    }
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while creating trade.", error: error.message });
  }
};

//update trade by id

export const updateTrade = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    
    const updateData: { [key: string]: any } = { ...req.body };
    if (req.file) {
      updateData.setupImage = req.file.path;
    }

    const updatedTrade = await Trade.findOneAndUpdate(
      { _id: req.params.id, userId },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTrade) {
      return res.status(404).json({ message: "Trade not found" });
    }
    
    res.json(updatedTrade);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors: { [key: string]: { message: string } } = {};
      for (const field in error.errors) {
        errors[field] = { message: error.errors[field].message };
      }
      return res
        .status(400)
        .json({ message: "Validation failed", errors });
    }
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while updating trade.", error: error.message });
  }
};

//delete trade by id

export const deleteTrade = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const deleteTrade = await Trade.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!deleteTrade) {
      return res.status(404).json({ message: "Trade not found" });
    }
    res.json({ message: "Trade deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: (error as Error).message });
  }
};
