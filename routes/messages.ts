import express from "express";
import tokenAuth from "../middleware/tokenAuth";
import {
    createMessage,
    deleteMessage,
    getMessage,
    getNews,
    getUserMessages,
    getUserNotifications,
} from "../controllers/messages";
import {
    validateMessageByType,
    validatorMessage,
} from "../validators/messages";

const router = express.Router();
// create a message
router.post(
    "/",
    validatorMessage,
    validateMessageByType,
    tokenAuth,
    createMessage
);

// get user messages
router.get("/", tokenAuth, getUserMessages);

// get news
router.get("/news", getNews);

// get notifications
router.get("/notifications", tokenAuth, getUserNotifications);

// get a message
router.get("/:id", tokenAuth, getMessage);

// delete a message
router.delete("/:id", tokenAuth, deleteMessage);

// module.exports = router;
export default router;
