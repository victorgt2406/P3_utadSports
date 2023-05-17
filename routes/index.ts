import express from "express";
import fs from "fs";
const routes = express.Router();

const removeExtension = (fileName:string) => {
    return fileName.split('.').shift();
}

// read all the files in this subdirectory except the index (this file)
fs.readdirSync(__dirname).filter(async (file:string) => {
    const name = removeExtension(file); // index, users, storage, tracks
    if(name !== 'index') {
        // add to the router a route with its subroutes configured
        // routes.use('/' + name, require('./'+name)); // http://localhost:3000/api/tracks
        routes.use('/' + name, (await import("./"+name)).default); // http://localhost:3000/api/tracks
    }
})

// module.exports = router
export default routes;