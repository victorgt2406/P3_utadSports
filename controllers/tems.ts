import { Response } from "express";
import { RequestWithUser } from "../middleware/tokenAuth";
import { body, matchedData } from "express-validator";
import { UserSum } from "../models/users";
import { teamsModel, usersModel } from "../models";
import handleError from "../utils/handleError";
import { TeamCreationRequest } from "../validators/teams";
import { Team } from "../models/teams";

const createTeam = async (req: RequestWithUser, res: Response) => {
    const data:TeamCreationRequest = matchedData(req) as TeamCreationRequest;
    const user = req.user!;
    try {
        const captain: UserSum = {
            _id: user.id,
            email: user.email,
            icon: user.nick,
            nick: user.nick,
        };
        const players: UserSum[] = [];
        if (data.players) {
            data.players.map(async (player: string) => {
                const p = await usersModel.findOne({ _id: player });
                if (p) {
                    players.push({
                        _id: p.id,
                        icon: p.icon,
                        nick: p.nick,
                        email: p.email,
                    });
                }
            });
        }
        const body = {
            icon: data.icon?data.icon:"",
            name: data.name,
            description: data.description,
            sport: data.sport,
            players,
            captain
        };
        const team:Team = await teamsModel.create(body);
        res.send(team);
    } catch (err) {
        console.log(err);
        handleError(res, "ERROR_CREATE_TEAM", 500);
    }
};
