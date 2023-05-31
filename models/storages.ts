import mongoose from "mongoose";

const StorageScheme = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false
    }
);
export default mongoose.model("storages", StorageScheme); // Nombre de la colección (o de la tabla en SQL)