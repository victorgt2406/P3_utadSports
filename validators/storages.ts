import { check } from "express-validator"
import validateResults from "../utils/handleValidator"

//No necesita validatorCreateItem porque ya está haciendo uso de Multer

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req:any, res:any, next:any) => {
        return validateResults(req, res, next)
    }
]

export { validatorGetItem };