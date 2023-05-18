import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
    {
        icon:{
            type: String
        },
        nick:{
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        surname:{
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            required: true
        },
        birthdate: {
            type: Date
        },
        location: {
            type: String
        }
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false
    }
);

UsersSchema.index({ nick: 1 });

const UsersSumSchema = new mongoose.Schema(
    {
        _id:{
            type: String
        },
        icon:{
            type: String
        },
        nick:{
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        }
    }
);

export default mongoose.model("users", UsersSchema);
export {UsersSumSchema}