import { Response } from "express";
import { tokenSign } from "./handleJwt";

/** Encargado de registrar un nuevo usuario
* @param {*} user
* @param {Response} res 
*/
const handleLogin = async ({_id, role, ...user}:any,res:Response) => {
    const token = await tokenSign({_id, role});
    res.send({
        user: {_id, role, ...user},
        token: {
            token,
            hoursExp: 2
        }
    });
}

export default handleLogin;