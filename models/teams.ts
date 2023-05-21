import mongoose from "mongoose";
import { UserSum, UsersSumSchema } from "./users";
import { SPORTS, SportNames } from "./sports";

interface Team {
    icon: string;
    name: string;
    description: string;
    sport: SportNames;
    captain: UserSum;
    players?: UserSum[];
    open?: boolean;
    // whitelist?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const Teams = new mongoose.Schema<Team>(
    {
        icon: {
            type: String
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        sport: {
            type: String,
            enum: SPORTS,
            required: true,
        },
        captain: {
            type: UsersSumSchema,
            required: true,
        },
        players: {
            type: [UsersSumSchema],
        },
        open: {
            type: Boolean,
        },
        // whitelist: {
        //     type: [String],
        // },
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false,
    }
);

Teams.index({ nick: 1 });

export default mongoose.model("teams", Teams);

export type { Team };
