import { Request } from "express";

function getRamdomAvatarUrl(req:Request){
    return `http://${req.headers.host}/storage/randomAvatar/${Math.floor(Math.random()*(10))+1}.png`;
};

// module.exports = getRamdomAvatarUrl;
export default getRamdomAvatarUrl;