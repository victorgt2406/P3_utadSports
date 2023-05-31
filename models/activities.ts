import mongoose from "mongoose";
import { SPORTS, SportNames } from "./sports";
import teams, { Team, TeamsSchema } from "./teams";
import { StringDecoder } from "string_decoder";

const LOCATIONS = ["pista","padel"];
type Location = "pista" | "padel"

interface Activity {
    name: string;
    date: String;
    sport: SportNames;
    location: Location;
    registeredTeams: boolean;
    home: Team;
    away?: Team;
    result: string
};


const ActivitiesSchema = new mongoose.Schema<Activity>(
    {
        name: {
            type: String,
            required: true,
            unique: true
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
        },
        result:{
            type: String
        },
        date:{
            type: String,
            required: true
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