import { NextFunction, Request, Response } from "express";

import { check } from "express-validator";
import validateResults, {
    contentValidator,
    userValidator,
} from "../utils/handleValidator";
import { MESSAGE_STATES, MESSAGE_TYPES } from "../models/messages";

const validatorMessage = [
    check("type").optional().notEmpty().isIn(MESSAGE_TYPES),
    check("to").optional().notEmpty().isString(),
    check("content").exists().notEmpty().custom(contentValidator),
    check("state").optional().notEmpty().isIn(MESSAGE_STATES),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorMessage };
