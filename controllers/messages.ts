import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { messagesModel, usersModel } from "../models";
import handleError from "../utils/handleError";
import { RequestWithUser } from "../middleware/tokenAuth";
import { User, UserSum } from "../models/users";

const createMessage = async (req: RequestWithUser, res: Response) => {
    const body = matchedData(req);
    const user = req.user!;
    try {
        const from: UserSum = {
            _id: user.id,
            email: user.email,
            icon: user.nick,
            nick: user.nick,
        };
        body.from = from;
        if (body.to) {
            const toUser = await usersModel.findOne({ _id: body.to });
            if (toUser) {
                const to: UserSum = {
                    _id: toUser.id,
                    email: toUser.email,
                    icon: toUser.nick,
                    nick: toUser.nick,
                };
                body.to = to;
            } else {
                handleError(res, "BAD_TO_USER");
                return;
            }
        }
        const message = await messagesModel.create(body);
        res.send(message);
    } catch (err) {
        console.log(err);
        handleError(res, "ERROR_CREATE_MESSAGE", 500);
    }
};

const getMessage = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    try {
        const user = req.user!;
        const message = await messagesModel.findOne({
            _id: id,
            $or: [{ "to._id": user.id }, { "from._id": user.id }],
        });
        res.send(message);
    } catch (err) {
        console.log(err);
        handleError(res, "ERROR_GET_MESSAGE", 500);
    }
};

const getUserMessages = async (req: RequestWithUser, res: Response) => {
    try {
        const user = req.user!;
        const filter: any = {
            $or: [{ "to._id": user.id }, { "from._id": user.id }],
        };
        if (req.query.from) {
            filter.from._id = req.query.from;
        }
        if (req.query.to) {
            filter.to._id = req.query.to;
        }
        if (req.query.type) {
            filter.type = req.query.type;
        }
        if (req.query.title) {
            filter.content.title = req.query.title;
        }
        const messages = await messagesModel.find(filter);
        res.send(messages);
    } catch (err) {
        console.log(err);
        handleError(res, "ERROR_GET_MESSAGES", 500);
    }
};

const getUserNotifications = async (req: RequestWithUser, res: Response) => {
    try {
        const user = req.user!;
        const filter: any = {
            "to._id": user.id,
            state: "unread",
            type: "notifications",
        };
        const messages = await messagesModel.find(filter);
        res.send(messages);
    } catch (err) {
        console.log(err);
        handleError(res, "ERROR_GET_NOTIFICATIONS", 500);
    }
};

const getNews = async (req: Request, res: Response) => {
    try {
        const filter: any = { type: "news" };
        const messages = await messagesModel.find(filter);
        res.send(messages);
    } catch (err) {
        console.log(err);
        handleError(res, "ERROR_GET_NEWS", 500);
    }
};

const deleteMessage = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    try {
        const user = req.user!;
        const message = await messagesModel.deleteOne({
            _id: id,
            $or: [{ "to._id": user.id }, { "from._id": user.id }],
        });
        res.send(message);
    } catch (err) {
        console.log(err);
        handleError(res, "ERROR_DELETE_MESSAGE", 500);
    }
};

export {
    createMessage,
    getMessage,
    getUserMessages,
    getNews,
    getUserNotifications,
    deleteMessage,
};
