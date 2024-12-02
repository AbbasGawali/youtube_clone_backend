
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    channelId: {
        type: mongoose.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
    uploader: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
        required: true,
    },
    disLikes: {
        type: Number,
        default: 0,
        required: true,
    },
    uploadedDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comments",
    }],
}, { timestamps: true });

const Video = mongoose.model("Video", videoSchema);
export default Video;





