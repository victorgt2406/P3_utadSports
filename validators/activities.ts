import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";
import { SportNames } from "../models/sports";
import { Location } from "../models/activities";

type ActivityCreationRequest = {
    icon?: string;
    name: string;
    description:string;
    date: Date;
    sport: SportNames;
    location: Location;
    registeredTeams: boolean;
    home: string;
    away?: string;
}

const validatorActivity = [
    check("name").exists().notEmpty().isString(),
    check("icon").optional().notEmpty().isString(),
    check("description").exists().notEmpty().isString(),
    check("location").exists().notEmpty().isString(),
    check("local").exists().notEmpty().isString(),
    check("away").optional().notEmpty().isString(),
    check("registeredTeams").optional().notEmpty().isBoolean(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export {validatorActivity};

export type {ActivityCreationRequest};