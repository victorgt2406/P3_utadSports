import mongoose from "mongoose";
import { UsersSumSchema } from "./users";
import { SPORTS } from "./sports";

const Teams = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        sport: {
            type: String,
            enum: SPORTS,
            required: true
        },
        captain: {
            type: UsersSumSchema,
            required: true
        },
        players: {
            type: [UsersSumSchema]
        }
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false
    }
);

Teams.index({ nick: 1 });

export default mongoose.model("teams", Teams);