import Strategy from "@models/Strategy";
import { Request, Response } from "express";

// Get all strategies with filtering and sorting
export const getStrategies = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { date, sort } = req.query;

    let query: any = { userId };
    if (date) {
      const selectedDate = new Date(date as string);
      const nextDay = new Date(date as string);
      nextDay.setDate(selectedDate.getDate() + 1);
      query.date = {
        $gte: selectedDate,
        $lt: nextDay,
      };
    }

    let sortOrder: any = { date: -1 }; // Default sort by date descending
    if (sort === "asc") {
      sortOrder = { date: 1 };
    }

    const strategies = await Strategy.find(query).sort(sortOrder);
    res.json(strategies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: (error as Error).message });
  }
};

// Get strategy by id
export const getStrategyById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const strategy = await Strategy.findOne({ _id: req.params.id, userId });
    if (!strategy) {
      return res.status(404).json({ message: "Strategy not found" });
    }
    res.json(strategy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: (error as Error).message });
  }
};

// Create a new strategy
export const createStrategy = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { date, content } = req.body;

    const strategy = new Strategy({ date, content, userId });
    const savedStrategy = await strategy.save();
    res.status(201).json(savedStrategy);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors: { [key: string]: { message: string } } = {};
      for (const field in error.errors) {
        errors[field] = { message: error.errors[field].message };
      }
      return res.status(400).json({ message: "Validation failed", errors });
    }
    console.error(error);
    res.status(500).json({ message: "Server error while creating strategy.", error: error.message });
  }
};

// Update strategy by id
export const updateStrategy = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { date, content } = req.body;

    const updatedStrategy = await Strategy.findOneAndUpdate(
      { _id: req.params.id, userId },
      { date, content },
      { new: true, runValidators: true }
    );

    if (!updatedStrategy) {
      return res.status(404).json({ message: "Strategy not found" });
    }
    
    res.json(updatedStrategy);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors: { [key: string]: { message: string } } = {};
      for (const field in error.errors) {
        errors[field] = { message: error.errors[field].message };
      }
      return res.status(400).json({ message: "Validation failed", errors });
    }
    console.error(error);
    res.status(500).json({ message: "Server error while updating strategy.", error: error.message });
  }
};

// Delete strategy by id
export const deleteStrategy = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const deletedStrategy = await Strategy.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!deletedStrategy) {
      return res.status(404).json({ message: "Strategy not found" });
    }
    res.json({ message: "Strategy deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: (error as Error).message });
  }
};
