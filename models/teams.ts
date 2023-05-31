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
    max: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const TeamsSchema = new mongoose.Schema<Team>(
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
            default: true
        },
        max: {
            required: true,
            type: Number
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

TeamsSchema.index({ name: 1 });

export default mongoose.model("teams", TeamsSchema);

export {TeamsSchema};

export type { Team };
