import { matchedData } from "express-validator";
import { usersModel } from "../models";
import handleError from "../utils/handleError";
import { encrypt, compare } from "../utils/handlePassword";
import getRamdomAvatarUrl from "../utils/handleRandomAvatar";
import { Request, Response } from "express";
import handleLogin from "../utils/handleLogin";

const registerUser = async (req: Request, res: Response) => {
    const body = matchedData(req);
    // console.log(req);
    body.password = await encrypt(body.password);
    // const body = { ...data, password };
    try {
        if (body.icon === undefined) {
            // console.log(req);
            body.icon = getRamdomAvatarUrl(req);
        }
        const user = await usersModel.create(body);
        user.set("password", undefined, { strict: false });
        handleLogin(user.toJSON(), res);
    } catch (err) {
        console.log(err);
        handleError(res, "REPEATED_EMAIL");
    }
};

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = matchedData(req);
    try {
        const user = await usersModel.findOne({ email });
        if (user === null) {
            handleError(res, "NOT_REGISTERED", 402);
        } else {
            if (await compare(password, user.password)) {
                user.set("password", undefined, { strict: false });
                handleLogin(user.toJSON(), res);
            } else {
                handleError(res, "PASSWORD_INCORRECT");
            }
        }
    } catch {
        handleError(res, "LOGIN_ERROR", 500);
    }
};

export { registerUser, loginUser };
