import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },

    // check it todo for multiple channels
    channel: {
        default: null, 
        type: mongoose.Types.ObjectId,
        ref: "Channel",
    }
}, { timestamps: true })

const User = mongoose.model("User", UserSchema);
export default User;
