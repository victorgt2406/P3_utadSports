import express from "express";
import { createActivity, getActivity, getCalendar } from "../controllers/activities";
import { validatorActivity } from "../validators/activities";
import tokenAuth from "../middleware/tokenAuth";
const router = express.Router();
// get all
router.get("/", getActivity);
// get one
router.get('/calendar', getCalendar);

router.get("/:id",);
// insert one
router.post("/", validatorActivity, tokenAuth, createActivity);
// put one
router.put("/:id",);
// delete one
router.delete("/:id",);

export default router;