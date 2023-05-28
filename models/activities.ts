import mongoose from "mongoose";
import { SPORTS, SportNames } from "./sports";
import teams, { Team } from "./teams";

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


const Activities = new mongoose.Schema<Activity>(
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
            required: true,
            type: Boolean
        },
        home:{
            required: true,
            type: teams
        },
        away:{
            type: teams
        }
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false,
    }
);

Activities.index({ name: 1 });

export default mongoose.model("activities", Activities);

export type {Activity, Location};