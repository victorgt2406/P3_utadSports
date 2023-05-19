import mongoose from "mongoose";

interface User extends Document {
    _id: string;
    icon: string;
    nick: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: "user" | "admin";
    birthdate: Date;
    address: string;
}

const UsersSchema = new mongoose.Schema<User>(
    {
        icon: { type: String },
        nick: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            required: true,
        },
        birthdate: { type: Date },
        address: { type: String },
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false,
    }
);

UsersSchema.index({ nick: 1 });

const UsersSumSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    icon: { type: String },
    nick: { type: String },
    email: { type: String },
});

export default mongoose.model<User>("users", UsersSchema);
export { UsersSumSchema };
export type {User};
