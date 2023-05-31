import { Request } from "express"

import multer from "multer"

const storage = multer.diskStorage({
    destination:function(req: Request, file: any, callback:any){ //Pasan argumentos automáticamente
        const pathStorage = __dirname+"/../storage" //Se llevaría a S3 de AWS por ejemplo
        callback(null, pathStorage) //error y destination
    },
    filename:function(req: Request, file: any, callback:any){ //Sobreescribimos o renombramos
        //Tienen extensión jpg, pdf, mp4
        const ext = file.originalname.split(".").pop() //el último valor
        const filename = "file-"+Date.now()+"."+ext
        callback(null, filename)
    }
})
//Middleware en la ruta y el controlador
const uploadMiddleware = multer({storage})

export default uploadMiddleware;