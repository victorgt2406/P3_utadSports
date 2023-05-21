import express from "express";
const router = express.Router();
// create a team
router.post('/',);

// get all
router.get('/',);

// get
router.get('/:id',);

// update
router.put('/:id',);

// delete
router.delete('/:id',);

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