import express from "express";
import { validatorTeamCreation, validatorTeamUpdate } from "../validators/teams";
import tokenAuth from "../middleware/tokenAuth";
import { addTeamPlayer, closeTeam, createTeam, deleteTeam, getTeam, getTeams, joinTeam, openTeam, removeTeamPlayer, unjoinTeam, updateTeam } from "../controllers/teams";
const router = express.Router();
// create a team
router.post('/', validatorTeamCreation, tokenAuth, createTeam);

// get all
router.get('/', getTeams);

// get
router.get('/:id', getTeam);

// update
router.put('/:id', validatorTeamUpdate, tokenAuth, updateTeam);

// delete
router.delete('/:id',  deleteTeam);

// join or ask to join as a player to a team
router.patch('/join/:team', tokenAuth, joinTeam);

// unjoin a team
router.patch('/unjoin/:team', tokenAuth, unjoinTeam);

// open team
router.patch('/open/:id', tokenAuth, openTeam);

// close team
router.patch('/close/:id', tokenAuth, closeTeam);

// add a player by a captain
router.patch('/add/:team/:player', tokenAuth, addTeamPlayer);

// remove a player by a captain
router.patch('/remove/:team/:player', tokenAuth, removeTeamPlayer);

// module.exports = router;
export default router;