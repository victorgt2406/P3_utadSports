import { NextFunction, Request, Response } from "express";

import handleError from "./utils/handleError";
import { verifyToken } from "./utils/handleJwt";
import { usersModel } from "./models";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { JwtPayload } from "jsonwebtoken";
import { User } from "./models/users";
import { RequestHandler } from "express";

// Define your own Request type that includes the 'user' property

interface RequestWithUser
    extends Request<ParamsDictionary, any, any, ParsedQs> {
    user?: User;
}

const tokenAuth: RequestHandler = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.headers.authorization) {
            handleError(res, "NOT_TOKEN", 401);
            return;
        }

        // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(" ").pop()!;
        //Del token, miramos en Payload (revisar verifyToken de utils/handleJwt)
        const dataToken: JwtPayload = (await verifyToken(token)) as JwtPayload;

        if (!dataToken) {
            handleError(res, "INVALID_TOKEN", 401);
            return;
        }
        const user: User = (await usersModel.findOne(
            { _id: dataToken._id },
            { password: 0, deleted: 0 }
        ))!; // findOne válido para Mongoose y Sequelize
        req.user = user; // Inyecto al user en la petición

        next();
    } catch (err) {
        handleError(res, "NOT_SESSION", 401);
    }
};

export default tokenAuth;
export type { RequestWithUser };
