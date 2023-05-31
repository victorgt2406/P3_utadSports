import { storageModel } from '../models'
import handleHttpError from '../utils/handleError'
import { matchedData } from 'express-validator'
import fs from "fs"

const MEDIA_PATH = __dirname + "/../storage"
/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req:any, res:any) => {
    try {
        const data = await storageModel.find({})
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_LIST_ITEMS')
    }
}

/**
 * Obtener un detalle
 * @param {} req 
 * @param {*} res 
 */
const getItem = async (req:any, res:any) => {
    try {
        const { id } = matchedData(req)
        const data = await storageModel.findById(id)
        res.send(data)
    } catch (err) {
        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

/**
 * Inserta un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req:any, res:any) => {
    try {
        const { body, file } = req
        const fileData = {
            filename: file.filename,
            url: process.env.PUBLIC_URL + "/storage/" + file.filename
        }
        const data = await storageModel.create(fileData)
        res.send(data)
    } catch (err) {
        handleHttpError(res, "ERROR_DETAIL_ITEM")
    }
}


/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req:any, res:any) => {
    try {
        const { id } = matchedData(req)
        const dataFile = await storageModel.findById(id)
        await storageModel.deleteOne({ _id: id })
        const filePath = MEDIA_PATH + "/" + dataFile!.filename
        fs.unlinkSync(filePath)
        const data = {
            filePath,
            deleted: true
        }
        res.send(data)
    } catch (err) {
        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}


export { getItems, getItem, createItem, deleteItem };