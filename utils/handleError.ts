import { Response } from "express"

const handleError = (res:Response, message:string, code:number = 403) => {
    res.status(code).send(message);
}

export default handleError