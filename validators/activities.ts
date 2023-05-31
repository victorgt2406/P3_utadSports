import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";
import { SportNames } from "../models/sports";
import { Location } from "../models/activities";

type ActivityCreationRequest = {
    name: string;
    date: string;
    sport: SportNames;
    location: Location;
    registeredTeams: boolean;
    home: string;
    away?: string;
    start_date: string;
    result: "0 - 0";
}

const validatorActivity = [
    check("name").exists().notEmpty().isString(),
    check("sport").exists().notEmpty().isString(),
    check("date").exists().notEmpty().isString(),
    check("location").exists().notEmpty().isString(),
    check("home").exists().notEmpty().isString(),
    check("away").optional().notEmpty().isString(),
    check("registeredTeams").optional().notEmpty().isBoolean(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export {validatorActivity};

export type {ActivityCreationRequest};