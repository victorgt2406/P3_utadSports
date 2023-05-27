import { NextFunction, Request, Response } from "express";

import { check } from 'express-validator';
import validateResults from "../utils/handleValidator";
import { SPORTS } from "../models/sports";
import { SportNames } from "../models/sports";
import { type } from "os";

const validatorTeamCreation = [
    check('icon').optional().isString(),
    check('name').exists().notEmpty().isLength({ min: 3, max: 20 }),
    check('description').exists().notEmpty().isString(),
    check('sport').exists().notEmpty().isIn(SPORTS),
    check('captain').optional().notEmpty().isString(),
    check('primaryColor').optional().notEmpty().isString(),
    check('secondaryColor').optional().notEmpty().isString(),
    check('players').optional().notEmpty().isArray().custom((value, { req }) => {
        return value.every((player: any) => typeof player === 'string');
    }),
    check('open').optional().notEmpty().isBoolean(),
    (req:Request, res:Response, next:NextFunction) => {
        return validateResults(req, res, next)
    }
];

const validatorTeamUpdate = [
    check('icon').optional().isString(),
    check('name').optional().notEmpty().isLength({ min: 3, max: 20 }),
    check('description').optional().notEmpty().isString(),
    check('sport').optional().notEmpty().isIn(SPORTS),
    check('open').optional().notEmpty().isBoolean(),
    (req:Request, res:Response, next:NextFunction) => {
        return validateResults(req, res, next)
    }
];

interface TeamCreationRequest {
    icon?: string;
    name: string;
    description: string;
    sport: SportNames;
    captain?: string;
    players?: string[];
    open?: boolean;
};

interface TeamUpdateRequest {
    icon?: string;
    name?: string;
    description?: string;
    sport?: SportNames;
    open?: boolean;
};

export type {TeamCreationRequest, TeamUpdateRequest};

export {validatorTeamCreation, validatorTeamUpdate};