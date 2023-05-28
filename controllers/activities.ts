import { Response } from "express";
import { RequestWithUser } from "../middleware/tokenAuth";
import { body, matchedData } from "express-validator";
import { UserSum } from "../models/users";
import { activitiesModel, messagesModel, teamsModel, usersModel } from "../models";
import handleError from "../utils/handleError";
import { TeamCreationRequest, TeamUpdateRequest } from "../validators/teams";
import { Team } from "../models/teams";
import { Message } from "../models/messages";
import { title } from "process";
import { ActivityCreationRequest } from "../validators/activities";
import { Activity } from "../models/activities";

const createActivity = async (req: RequestWithUser, res: Response) => {
    const data: ActivityCreationRequest = matchedData(
        req
    ) as ActivityCreationRequest;
    const user = req.user!;
    if (user) {
        var home: Team | undefined = undefined;
        var away: Team | undefined = undefined;
        try {
            if (data.registeredTeams) {
                home = (
                    await teamsModel.findOne({ _id: data.home })
                )?.toJSON() as Team;
                if(data.away){
                    away = (
                        await teamsModel.findOne({ _id: data.away })
                    )?.toJSON() as Team;
                }
            } else {
                // creating home team
                const captain: UserSum = {
                    _id: user.id,
                    email: user.email,
                    icon: user.icon,
                    nick: user.nick,
                };
                const body = {
                    name: "teamA" + new Date().toString(),
                    icon: "",
                    description: "temporal team",
                    sport: data.sport,
                    captain,
                    max: 0,
                };
                home = await teamsModel.create(body);
                away = undefined;
            }
            const body: Activity = {
                ...data,
                icon: data.icon?data.icon:"",
                home,
                away
            }
            activitiesModel.create(body)
        } catch (err) {
            console.log(err);
        }
    } else {
        handleError(res, "DELETED_USER", 403);
    }
};


export {createActivity};