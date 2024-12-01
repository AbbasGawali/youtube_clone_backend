import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    video: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Video"
    },
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;