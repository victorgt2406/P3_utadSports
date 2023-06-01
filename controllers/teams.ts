import { Response } from "express";
import { RequestWithUser } from "../middleware/tokenAuth";
import { body, matchedData } from "express-validator";
import { UserSum } from "../models/users";
import { messagesModel, teamsModel, usersModel } from "../models";
import handleError from "../utils/handleError";
import { TeamCreationRequest, TeamUpdateRequest } from "../validators/teams";
import { Team } from "../models/teams";
import { Message } from "../models/messages";
import getTeamLogo from "../utils/handleTeamLogos";

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
            let icon: string = "";
            if (!data.icon) {
                icon = getTeamLogo(req, data.sport);
            } else {
                icon = data.icon;
            }
            const body: Team = {
                icon,
                name: data.name,
                description: data.description,
                sport: data.sport,
                players,
                captain,
                max: data.max,
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
                res.send(
                    response.acknowledged
                        ? open
                            ? "OPENED"
                            : "CLOSED"
                        : "FAILED"
                );
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

const joinTeam = async (req: RequestWithUser, res: Response) => {
    const team = await teamsModel.findOne({ _id: req.params.team });
    if (team && req.user) {
        const player = (await usersModel.findOne({ _id: req.user.id }))!;
        const players = team.players === undefined ? [] : team.players;
        if (!players.find((pl) => pl._id === player.id)) {
            if (team.open) {
                // players.push({
                //     _id: player.id,
                //     icon: player.icon,
                //     nick: player.nick,
                //     email: player.email,
                // });
                const playerData = {
                    _id: player.id,
                    icon: player.icon,
                    nick: player.nick,
                    email: player.email,
                };
                // console.log(playerData);
                try {
                    const response = await teamsModel.updateOne(
                        { _id: team.id },
                        { $push: { players: playerData } }
                    );
                    // console.log(response);
                    const message: Message = {
                        type: "notification",
                        content: [
                            {
                                lang: "es",
                                content: `${player.nick} se ha unido a ${team.name} %%join=https://localhost:3000%%`,
                                title: `${player.nick} se ha unido a ${team.name}`,
                            },
                            {
                                lang: "en",
                                content: `${player.nick} has joined ${team.name} %%join=https://localhost:3000%%`,
                                title: `${player.nick} has joined ${team.name}`,
                            },
                        ],
                        state: "unread",
                        to: team.captain,
                    };
                    messagesModel.create(message);
                    res.send("JOINED");
                } catch (err) {
                    console.log(err);
                    handleError(res, "ERROR_JOIN_PLAYER", 500);
                }
            } else {
                const message: Message = {
                    type: "notification",
                    content: [
                        {
                            lang: "es",
                            content: `${player.nick} se quiere unir a ${team.name} %%join=https://localhost:3000%%`,
                            title: `${player.nick} se quiere unir a ${team.name}`,
                        },
                        {
                            lang: "en",
                            content: `${player.nick} wants to join ${team.name} %%join=https://localhost:3000%%`,
                            title: `${player.nick} wants to join ${team.name}`,
                        },
                    ],
                    state: "unread",
                    to: team.captain,
                };
                messagesModel.create(message);
                res.send("CAPTAIN_WAS_ASKED");
            }
        }
        else{
            handleError(res, "USER_JOINED", 403);
        }
    } else {
        handleError(res, "DELETED_USER", 403);
    }
};

const unjoinTeam = async (req: RequestWithUser, res: Response) => {
    const team = await teamsModel.findOne({ _id: req.params.team });
    if (team && req.user) {
        const players = (team.players === undefined ? [] : team.players).filter(
            (p) => p._id !== req.user!.id
        );
        try {
            await teamsModel.updateOne({ _id: team.id }, { $set: players });
            res.send("UNJOINED");
        } catch (err) {
            console.log(err);
            handleError(res, "ERROR_REMOVE_PLAYER", 500);
        }
    } else {
        handleError(res, "DELETED_USER", 403);
    }
};
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
    joinTeam,
    unjoinTeam,
};
