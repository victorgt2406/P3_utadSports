import { NextFunction, Request, Response } from "express";

import { check, matchedData } from "express-validator";
import validateResults, { contentValidator } from "../utils/handleValidator";
import { MESSAGE_STATES, MESSAGE_TYPES, Message } from "../models/messages";
import handleError from "../utils/handleError";

const validatorMessage = [
    check("type").optional().notEmpty().isIn(MESSAGE_TYPES),
    check("to").optional().notEmpty().isString(),
    check("content")
        .exists()
        .notEmpty()
        .isArray()
        .custom((value) => {
            return value.every(contentValidator);
        }),
    check("state").optional().notEmpty().isIn(MESSAGE_STATES),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validateMessageByType = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body: Message = matchedData(req) as Message;
        // console.log(body);

        if (!body.type) {
            body.type = "msg";
        }

        if ((body.type === "msg" || body.type === "notification") && !body.to) {
            handleError(res, "TO_ID_NEEDED");
            return;
        }

        if (body.type === "news") {
            req.body.to = undefined;
            req.body.from = undefined;
        }

        body.content.forEach((content) => {
            if (body.type === "news" && !content.title) {
                handleError(res, "CONTENT_TITLE_NEEDED");
                return;
            }

            if (body.type === "news" && !content.image) {
                handleError(res, "CONTENT_IMAGE_NEEDED");
                return;
            }
        });

        return next(); // Si no existe error con la validación se lo enviamos al siguiente (al controlador)
    } catch (err) {
        res.status(403); // Por ahora lo dejamos como no permitido
        res.send(err);
    }
};
export { validatorMessage, validateMessageByType };
