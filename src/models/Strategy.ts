import mongoose, { Schema, Document } from "mongoose";

export interface IStrategy extends Document {
  date: Date;
  content: string;
  userId: mongoose.Types.ObjectId;
}

const StrategySchema: Schema = new Schema({
  date: { type: Date, required: true },
  content: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model<IStrategy>("Strategy", StrategySchema);
