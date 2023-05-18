const SPORTS = ["football", "basketball", "padel"];
import mongoose from "mongoose";
import { MesageSchema } from "./messages";

const SportsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true,
      required: true,
    },
    rules: {
      type: MesageSchema,
      required: true,
    },
    locations: {
        type: [String],
        required: true,
    },
  },
  {
    timestamps: true, // TODO createdAt, updatedAt
    versionKey: false,
  }
);

SportsSchema.index({ nick: 1 });

export default mongoose.model("sports", SportsSchema);

export { SPORTS };
