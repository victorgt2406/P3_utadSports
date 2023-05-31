import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Content, LANGS } from "../models/messages";
import { UserSum } from "../models/users";
import { SPORTS } from "../models/sports";
import { MessageType } from "../models/messages";

const validateResults = (req:Request, res:Response, next:NextFunction) => {
    try {
        validationResult(req).throw(); // Valida lo que le hemos indicado
        return next(); // Si no existe error con la validación se lo enviamos al siguiente (al controlador)
    } catch (err) {
        res.status(403); // Por ahora lo dejamos como no permitido
        res.send(err);
    }
}

const contentValidator = (element:Content) => {
    if (element.lang && !LANGS.includes(element.lang)) {
        throw new Error('Invalid lang');
    }
    if (element.image && typeof element.image !== 'string') {
        throw new Error('Invalid title');
    }
    if (element.title && typeof element.title !== 'string') {
        throw new Error('Invalid title');
    }
    if (!element.content || typeof element.content !== 'string') {
        throw new Error('Invalid content');
    }
    return true;
};

const userValidator = (element:UserSum) => {
    if (!element._id || typeof element._id !== 'string') {
        throw new Error('Invalid _id');
    }
    if (element.nick && typeof element.nick !== 'string') {
        throw new Error('Invalid nick');
    }
    if (element.icon && typeof element.icon !== 'string') {
        throw new Error('Invalid icon');
    }
    if (element.email && typeof element.email !== 'string') {
        throw new Error('Invalid email');
    }
    return true;
};


const sportValidator = (element: string) => {
    return SPORTS.includes(element);
}

export default validateResults;

export {contentValidator, userValidator, sportValidator};