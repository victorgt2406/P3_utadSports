import { Response } from "express";
import { RequestWithUser } from "../middleware/tokenAuth";
import { matchedData } from "express-validator";
import { UserSum } from "../models/users";
import { activitiesModel, messagesModel, teamsModel, usersModel } from "../models";
import handleError from "../utils/handleError";
import { Team } from "../models/teams";
import { ActivityCreationRequest } from "../validators/activities";
import { Activity } from "../models/activities";
import mongoose from "mongoose";

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
                result: '0 - 0',
                date: data.date
            }
            console.log(body)
            console.log(data)
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

    console.log(`Requested start of day: ${startOfDay}`);
    console.log(`Requested end of day: ${endOfDay}`);

    const filter = {
      date: {
        $gte: new Date(String(startOfDay)),
        $lte: new Date(String(endOfDay)),
      },
    };

    console.log(`Constructed filter: ${JSON.stringify(filter)}`);
  
    try {
      const response = await activitiesModel.find(filter);
      console.log(`Found ${response.length} matching activities`);
      res.send(response);
    } catch (err) {
      console.error("Error when fetching activities from database:", err);
      handleError(res, "ERROR_GET_CALENDAR", 500);
    }
};
const getActivityById = async (req: RequestWithUser, res: Response) => {
    try {
      const id = req.params.id;
      const activity = await activitiesModel.findById(id);
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      res.json(activity);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while retrieving activity" });
    }
  };
  
  const deleteActivity = async (req: RequestWithUser, res: Response) => {
    try {
      const id = req.params.id;
      const activity = await activitiesModel.findByIdAndDelete(id);
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      res.json({ message: "Activity deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while deleting activity" });
    }
  };

  const updateActivity = async (req: RequestWithUser, res: Response) => {
    try {
      const id = req.params.id;
      const { score, away } = req.body;
      
      if (!mongoose.Types.ObjectId.isValid(away)) {
        return res.status(400).json({ error: "Invalid team ID" });
      }
  
      const activity = await activitiesModel.findByIdAndUpdate(id, { score, away }, { new: true });
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      res.json(activity);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while updating activity" });
    }
  };
  
  
export {createActivity, getActivity, getCalendar, updateActivity, deleteActivity, getActivityById};