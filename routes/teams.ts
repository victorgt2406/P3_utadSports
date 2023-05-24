import express from "express";
import { validatorTeamCreation, validatorTeamUpdate } from "../validators/teams";
import tokenAuth from "../middleware/tokenAuth";
import { createTeam, deleteTeam, getTeam, getTeams, updateTeam } from "../controllers/teams";
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
router.delete('/:id', tokenAuth, deleteTeam);

// ask to join as a user to a team
router.post('/join/:id',);

// unjoin a team
router.post('/unjoin/:id',);

// add a user by a captain
router.patch('/add/:id',);

// remove a user by a captain
router.patch('/remove/:id',);

// module.exports = router;
export default router;