import { Response } from "express";
import { RequestWithUser } from "../middleware/tokenAuth";
import { body, matchedData } from "express-validator";
import { UserSum } from "../models/users";
import { teamsModel, usersModel } from "../models";
import handleError from "../utils/handleError";
import { TeamCreationRequest, TeamUpdateRequest } from "../validators/teams";
import { Team } from "../models/teams";

const createTeam = async (req: RequestWithUser, res: Response) => {
    const data: TeamCreationRequest = matchedData(req) as TeamCreationRequest;
    const user = req.user!;
    if (user) {
        const captain: UserSum = {
            _id: user.id,
            email: user.email,
            icon: user.icon,
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
        try {
            const body = {
                icon: data.icon ? data.icon : "",
                name: data.name,
                description: data.description,
                sport: data.sport,
                players,
                captain,
            };
            const team: Team = await teamsModel.create(body);
            res.send(team);
        } catch (err) {
            console.log(err);
            handleError(res, "REPEATED_NAME", 403);
        }
    } else {
        handleError(res, "DELETED_USER", 403);
    }
};

const updateTeam = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const body: TeamUpdateRequest = matchedData(req) as TeamUpdateRequest;
    const user = req.user!;
    const team = await teamsModel.findOne({ _id: id });
    if (user && team?.captain._id === user.id) {
        try {
            const response = await teamsModel.updateOne(
                { _id: id },
                { $set: { body } }
            );
            res.send(response);
        } catch (err) {
            console.log(err);
            handleError(res, "ERROR_UPDATE_TEAM", 500);
        }
    } else {
        handleError(res, "NOT_CAPTAIN", 403);
    }
};

const deleteTeam = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    const user = req.user!;
    const team = await teamsModel.findOne({ _id: id });
    if (user && team?.captain._id === user.id) {
        try {
            const response = await teamsModel.deleteOne({ _id: id });
            res.send(response);
        } catch (err) {
            console.log(err);
            handleError(res, "ERROR_DELETE_TEAM", 500);
        }
    } else {
        handleError(res, "NOT_CAPTAIN", 403);
    }
};

const getTeams = async (req: RequestWithUser, res: Response) => {
    const filter = {};
    try {
        const response = await teamsModel.find(filter);
        res.send(response);
    } catch (err) {
        console.log(err);
        handleError(res, "ERROR_GET_TEAM", 500);
    }
};

const getTeam = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    try {
        const response = await teamsModel.findOne({ _id: id });
        res.send(response);
    } catch (err) {
        console.log(err);
        handleError(res, "ERROR_GET_TEAM", 500);
    }
};

const addTeamPlayer = async (req: RequestWithUser, res: Response) => {
    const user = req.user!;
    const team = await teamsModel.findOne({ _id: req.params.team });
    const player = await usersModel.findOne({ _id: req.params.player });

    if (user && team && player && team?.captain._id === user.id) {
        const players = team.players === undefined ? [] : team.players;
        players.push({
            _id: player.id,
            icon: player.icon,
            nick: player.nick,
            email: player.email,
        });
        try {
            const response = await teamsModel.updateOne(
                { _id: team.id },
                { $set: players }
            );
            res.send(response);
        } catch (err) {
            console.log(err);
            handleError(res, "ERROR_ADD_PLAYER", 500);
        }
    } else {
        handleError(res, "NOT_CAPTAIN", 403);
    }
};

const removeTeamPlayer = async (req: RequestWithUser, res: Response) => {
    const user = req.user!;
    const team = await teamsModel.findOne({ _id: req.params.team });
    const player = await usersModel.findOne({ _id: req.params.player });

    if (user && team && player && team?.captain._id === user.id) {
        const players = (team.players === undefined ? [] : team.players).filter(
            (p) => p._id !== player.id
        );
        try {
            const response = await teamsModel.updateOne(
                { _id: team.id },
                { $set: players }
            );
            res.send(response);
        } catch (err) {
            console.log(err);
            handleError(res, "ERROR_REMOVE_PLAYER", 500);
        }
    } else {
        handleError(res, "NOT_CAPTAIN", 403);
    }
};

const openCloseTeam =
    (open: boolean) => async (req: RequestWithUser, res: Response) => {
        const { id } = req.params;
        const user = req.user!;
        const team = await teamsModel.findOne({ _id: id });
        if (user && team?.captain._id === user.id) {
            try {
                const response = await teamsModel.updateOne(
                    { _id: id },
                    { $set: { open } }
                );
                res.send(response.acknowledged?(open?"OPENED":"CLOSED"):"FAILED");
            } catch (err) {
                console.log(err);
                handleError(res, "ERROR_UPDATE_TEAM", 500);
            }
        } else {
            handleError(res, "NOT_CAPTAIN", 403);
        }
    };

const openTeam = openCloseTeam(true);
const closeTeam = openCloseTeam(false);

export {
    createTeam,
    updateTeam,
    deleteTeam,
    getTeams,
    getTeam,
    addTeamPlayer,
    removeTeamPlayer,
    openTeam,
    closeTeam,
};
