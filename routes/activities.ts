import express from "express";
import { createActivity, getActivity, getCalendar, getActivityById, deleteActivity, updateActivity } from "../controllers/activities";
import { validatorActivity } from "../validators/activities";
import tokenAuth from "../middleware/tokenAuth";
const router = express.Router();
// get all
router.get("/", getActivity);
// get one
router.get('/calendar', getCalendar);
// insert one
router.post("/", validatorActivity, tokenAuth, createActivity);
// put one
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);
router.get("/:id", getActivityById);



export default router;