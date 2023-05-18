import mongoose from "mongoose";
import { UsersSumSchema } from "./users";

const MesageSchema = new mongoose.Schema({
  lang: {
    type: String,
    enum: ["en", "es"],
    default: "es",
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
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
    title: {
      type: String,
      required: true,
    },
    msg: {
      type: MesageSchema,
      required: true,
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

MessagesSchema.index({ nick: 1 });

export default mongoose.model("messages", MessagesSchema);

export { MesageSchema };
