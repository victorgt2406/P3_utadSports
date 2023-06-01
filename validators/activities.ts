import { NextFunction, Request, Response } from "express";
import { check, oneOf } from "express-validator";
import validateResults from "../utils/handleValidator";
import { SportNames } from "../models/sports";
import { Location } from "../models/activities";
import { Team } from "../models/teams";

type ActivityCreationRequest = {
    name: string;
    date: Date;
    sport: SportNames;
    location: Location;
    registeredTeams: boolean;
    home: Team;
    away?: Team;
    result: "0 - 0";
}

const validatorActivity = [
    check("name").exists().notEmpty().isString(),
    check("sport").exists().notEmpty().isString(),
    check("date").exists().notEmpty(),
    check("location").exists().notEmpty().isString(),
    oneOf([
        [
            check('registeredTeams').isBoolean().equals('true'),
            check("home").exists().notEmpty(),
        ],
        [
            check('registeredTeams').isBoolean().equals('false'),
            check("home").optional().notEmpty(),
        ]
    ]),
    check("away").optional().notEmpty(),
    check("registeredTeams").optional().notEmpty().isBoolean(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export {validatorActivity};

export type {ActivityCreationRequest};