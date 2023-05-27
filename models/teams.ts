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
    primaryColor?: string;
    secondaryColor?: string;
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
            unique: true
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
        primaryColor: {
            type: String
        },
        secondaryColor: {
            type: String
        }
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false,
    }
);

Teams.index({ name: 1 });

export default mongoose.model("teams", Teams);

export type { Team };
