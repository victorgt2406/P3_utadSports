import { Lang } from "../langs/langs";
import Content from "./Content";
import User from "./User";

const MESSAGE_TYPES = ["msg", "news", "notification"];
type MessageType = "msg" | "news" | "notification";
const MESSAGE_STATES = ["read", "unread"];
type MessageState = "read" | "unread";

interface Message {
    _id: string;
    type: MessageType;
    from?: User;
    to?: User;
    content: Content[];
    state: MessageState;
    createdAt?: string;
    updatedAt?: string;
}

export default Message;

export type { MessageType, MessageState };
