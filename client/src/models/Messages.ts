import { Lang } from "../langs/langs";
import User from "./User";

const MESSAGE_TYPES = ["msg", "news", "notification"];
type MessageType = "msg" | "news" | "notification";
const MESSAGE_STATES = ["read", "unread"];
type MessageState = "read" | "unread";

interface Content {
    lang: Lang;
    content: string;
    title: string;
    image?: string;
}

interface Message {
    type: MessageType;
    from?: User;
    to?: User;
    content: Content[];
    state: MessageState;
}

export default Message;

export type { MessageType, MessageState, Content };
