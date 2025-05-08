import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'Users'
    }
);

const userModel = mongoose.model('userSchema', userSchema);

export default userModel;