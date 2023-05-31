import express from "express";
import fs from "fs";
const routes = express.Router();

const removeExtension = (fileName: string) => {
  return fileName.split('.').shift();
}

// Read all the files in this subdirectory except the index (this file)
fs.readdirSync(__dirname).filter((file: string) => {
  const name = removeExtension(file); // index, users, storage, tracks
  if (name !== 'index') {
    // Add to the router a route with its subroutes configured
    routes.use('/' + name, require('./' + name).default); // http://localhost:3000/api/tracks
  }
});

export default routes;
