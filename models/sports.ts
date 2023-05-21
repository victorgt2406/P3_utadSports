const SPORTS = ["football", "basketball", "padel"];
type SportNames = "football" | "basketball" | "padel";
import mongoose from "mongoose";
import { Content, ContentSchema } from "./messages";

interface Sport {
    name: SportNames;
    rules: Content;
    locations: string[];
}

const SportsSchema = new mongoose.Schema<Sport>(
    {
        name: {
            type: String,
            enum: SPORTS,
            unique: true,
            required: true,
        },
        rules: {
            type: ContentSchema,
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

export type { SportNames, Sport };