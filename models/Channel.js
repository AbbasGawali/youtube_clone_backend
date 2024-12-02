import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelName: {
        required: true,
        type: String,
        unique: true,
    },
    owner: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    description: {
        type: String,
        required: true,
    },
    channelLogo: {
        type: String,
        required: true,
    },
    channelBanner: {
        type: String,
        required: true,
    },
    subscribers: {
        type: Number,
        default: 0,
        required: true,
    },
    videos: [{
        type: mongoose.Types.ObjectId,
        ref: "Video",
    }]
}, { timestamps: true })

const Channel = mongoose.model("Channel", channelSchema);
export default Channel; 