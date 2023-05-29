import mongoose from "mongoose";
import { SPORTS, SportNames } from "./sports";
import teams, { Team, TeamsSchema } from "./teams";

const LOCATIONS = ["pista","padel"];
type Location = "pista" | "padel"

interface Activity {
    icon: string;
    name: string;
    description:string;
    date: Date;
    sport: SportNames;
    location: Location;
    registeredTeams: boolean;
    home: Team;
    away?: Team;
};


const ActivitiesSchema = new mongoose.Schema<Activity>(
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
            required: true
        },
        location: {
            type: String,
            enum: LOCATIONS,
            required: true
        },
        registeredTeams: {
            type: Boolean,
            required: true
            
        },
        home:{
            type: TeamsSchema,
            required: true,
        },
        away:{
            type: TeamsSchema
        }
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false,
    }
);

ActivitiesSchema.index({ name: 1 });

export default mongoose.model("activities", ActivitiesSchema);

export type {Activity, Location};