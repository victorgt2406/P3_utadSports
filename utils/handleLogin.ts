import { Response } from "express";
import { tokenSign } from "./handleJwt";

/** Encargado de registrar un nuevo usuario
* @param {*} user
* @param {Response} res 
*/
const handleLogin = async ({_id, role, ...user}:any,res:Response, hours:number = 2) => {
    const token = await tokenSign({_id, role, hours});
    res.send({
        user: {_id, role, ...user},
        token: token
    });
}

export default handleLogin;