import mongoose from "mongoose";
import { UserSum, UsersSumSchema } from "./users";

const LANGS = ["en", "es"];
type Lang = "en" | "es";
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
    from?: UserSum;
    to?: UserSum;
    content: Content;
    state: MessageState;
}

const ContentSchema = new mongoose.Schema<Content>(
    {
        lang: {
            type: String,
            enum: LANGS,
            default: "es",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: "",
        },
        image: {
            type: String,
        },
    },
    { _id: false }
);

const MessagesSchema = new mongoose.Schema<Message>(
    {
        type: {
            type: String,
            enum: MESSAGE_TYPES,
            default: "msg",
            required: true,
        },
        from: {
            type: UsersSumSchema,
        },
        to: {
            type: UsersSumSchema,
        },
        content: {
            type: ContentSchema,
        },
        state: {
            type: String,
            enum: MESSAGE_STATES,
            default: "unread",
            required: true,
        },
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false,
    }
);

MessagesSchema.index({ type: 1 });
MessagesSchema.index({ state: 1 });
MessagesSchema.index({ "from._id": 1 });
MessagesSchema.index({ "to._id": 1 });

export default mongoose.model("messages", MessagesSchema);

export { ContentSchema, MESSAGE_STATES, MESSAGE_TYPES, LANGS };

export type { Content, MessageType, MessageState, Lang };
