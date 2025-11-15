import mongoose, { Schema, Document } from "mongoose";

export interface ITrade extends Document {
  date: Date;
  setupImage: string; //url or bse64
  reason: string;
  status: "open" | "closed";
  entryPrice: number;
  quantity: number;
  profitLoss?: number;
  profitLossPercentage?: number;
  userId: mongoose.Types.ObjectId;
}
const TradeSchema: Schema = new Schema({
  date: { type: Date, required: true },
  setupImage: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ["open", "closed"], required: true },
  entryPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  profitLoss: { type: Number, required: false },
  profitLossPercentage: { type: Number, required: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model<ITrade>("Trade", TradeSchema);
