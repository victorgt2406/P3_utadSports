import { Response } from "express";
import { RequestWithUser } from "../middleware/tokenAuth";
import { matchedData } from "express-validator";
import { UserSum } from "../models/users";
import { activitiesModel, messagesModel, teamsModel, usersModel } from "../models";
import handleError from "../utils/handleError";
import { Team } from "../models/teams";
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
                home,
                away,
                result: data.result
            }
            activitiesModel.create(body)
        } catch (err) {
            console.log(err);
        }
    } else {
        handleError(res, "DELETED_USER", 403);
    }
};
const getActivity = async (req: RequestWithUser, res: Response) => {
    try {
        const response = await activitiesModel.find();
        res.send(response);
    } catch (err) {
        console.log(err);
        handleError(res, "ERROR_GET_ACTIVITY", 500);
    }
};
const getCalendar = async (req: RequestWithUser, res: Response) => {
    const { startOfDay, endOfDay } = req.query;

    const filter = {
      date: {
        $gte: new Date(String(startOfDay)),
        $lte: new Date(String(endOfDay)),
      },
    };
  
    try {
      const response = await activitiesModel.find(filter);
      res.send(response);
    } catch (err) {
      console.log(err);
      handleError(res, "ERROR_GET_CALENDAR", 500);
    }
}
export {createActivity, getActivity, getCalendar};