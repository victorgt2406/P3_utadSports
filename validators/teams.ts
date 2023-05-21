import { NextFunction, Request, Response } from "express";

import { check } from 'express-validator';
import validateResults from "../utils/handleValidator";
import { SPORTS } from "../models/sports";

const validatorTeamCreation = [
    check('icon').optional().isString(),
    check('name').exists().notEmpty().isLength({ min: 3, max: 20 }),
    check('description').exists().notEmpty().isString(),
    check('sport').exists().notEmpty().isIn(SPORTS),
    check('captain').optional().notEmpty().isString(),
    check('players').optional().notEmpty().isArray(),
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
    check('captain').optional().notEmpty().isString(),
    check('players').optional().notEmpty().isArray(),
    check('open').optional().notEmpty().isBoolean(),
    (req:Request, res:Response, next:NextFunction) => {
        return validateResults(req, res, next)
    }
];