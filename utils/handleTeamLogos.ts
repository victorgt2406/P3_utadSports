import { Request } from "express";
import { SportNames } from "../models/sports";

function getTeamLogo(req:Request, sport: SportNames){
    return `http://${req.headers.host}/storage/teamsLogos/${sport}.png`;
};

// module.exports = getRamdomAvatarUrl;
export default getTeamLogo;