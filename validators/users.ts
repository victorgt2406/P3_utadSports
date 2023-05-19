import { NextFunction, Request, Response } from "express";

import { check } from 'express-validator';
import validateResults from "../utils/handleValidator";

const validatorRegister = [
    check('nick').exists().notEmpty().isLength({ min: 3, max: 99 }),
    check('name').exists().notEmpty().isString(),
    check('surname').exists().notEmpty().isString(),
    check('email').exists().notEmpty().isEmail(),
    check('password').exists().notEmpty().isLength({ min: 8, max: 64 }),
    check('location').optional().isString(),
    check('icon').optional().isString(),
    (req:Request, res:Response, next:NextFunction) => {
        return validateResults(req, res, next)
    }
];

const validatorLogin = [
    check('email').exists().notEmpty().isEmail(),
    check('password').exists().notEmpty().isLength({ min: 8, max: 64 }),
    (req:Request, res:Response, next:NextFunction) => {
        return validateResults(req, res, next)
    }
];

export { validatorRegister, validatorLogin };