import mongoose from "mongoose";
import { UsersSumSchema } from "./users";

const ContentSchema = new mongoose.Schema({
    lang: {
        type: String,
        enum: ["en", "es"],
        default: "es",
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    tilte:{
        type: String,
        default: ""
    }
});

const MessagesSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["msg", "input", "news", "notification"],
            default: "msg",
            required: true,
        },
        from: {
            type: UsersSumSchema,
        },
        to: {
            type: UsersSumSchema,
        },
        content:{
            type: ContentSchema
        },
        state: {
            type: String,
            enum: ["unread", "read"],
            default: "unread",
            required: true,
        },
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false,
    }
);

MessagesSchema.index({ "type": 1 });
MessagesSchema.index({ "state": 1 });
MessagesSchema.index({ "from._id": 1 });
MessagesSchema.index({ "to._id": 1 });

export default mongoose.model("messages", MessagesSchema);

export { ContentSchema };
