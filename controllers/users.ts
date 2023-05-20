import { matchedData } from "express-validator";
import { usersModel } from "../models";
import handleError from "../utils/handleError";
import { encrypt, compare } from "../utils/handlePassword";
import getRamdomAvatarUrl from "../utils/handleRandomAvatar";
import { Request, Response } from "express";
import handleLogin from "../utils/handleLogin";
import { RequestWithUser } from "../middleware/tokenAuth";

const registerUser = async (req: Request, res: Response) => {
    const body = matchedData(req);
    body.password = await encrypt(body.password);
    try {
        if (body.icon === undefined) {
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
            handleError(res, "NOT_REGISTERED");
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

const updateUser = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const user = req.user!;
    const body = matchedData(req);
    if (id === user.id || user.role === "admin") {
        try {
            if (body.password) {
                body.password = await encrypt(body.password);
            }
            res.send(await usersModel.updateOne({ _id: id }, { $set: body }));
        } catch (err) {
            console.log(err);
            handleError(res, "UPDATE_ERROR");
        }
    } else {
        handleError(res);
    }
};

const deleteUser = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const user = req.user!;
    if (id === user.id || user.role === "admin") {
        try {
            res.send(await usersModel.deleteOne({ _id: id }));
        } catch (err) {
            console.log(err);
            handleError(res, "DELETE_ERROR", 500);
        }
    } else {
        handleError(res);
    }
};

const getUser = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const user = req.user!;
    if (id === user.id || user.role === "admin") {
        try {
            res.send(await usersModel.findOne({ _id: id }, {password: 0}));
        } catch (err) {
            console.log(err);
            handleError(res, "GET_ERROR", 500);
        }
    } else {
        handleError(res);
    }
};

export { registerUser, loginUser, updateUser, deleteUser, getUser };
