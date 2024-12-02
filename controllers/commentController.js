import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addComment = async (req, res) => {

    if (!req.body.description) {
        return res.status(400).json({ success: false, message: "comment description is required" });
    }

    if (!req.body.owner) {
        return res.status(400).json({ success: false, message: "owner is required" });
    }
    if (!req.body.video) {
        return res.status(400).json({ success: false, message: "video is required" });
    }

    const { description, owner, video } = req.body;


    try {
        const user = await User.findById(owner);
        const isVideo = await Video.findById(video);
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" });
        }
        if (!isVideo) {
            return res.status(400).json({ success: false, message: "invalid video to comment" })
        }

        const comment = await Comment.create({ description, owner, video });

        isVideo.comments.push(comment._id);
        await isVideo.save();

        res.status(201).json({ success: true, message: "comment added", comment });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "server error" })
    }
}


export const getAllComments = async (req, res) => {
    try {
        const result = await Comment.find();
        if (!result || result.length < 1) {
            return res.status(404).json({ success: false, message: "Comments not found" });
        }
        res.status(200).json({ success: true, comments: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}

export const getSingleComment = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Comment.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "comment not found" });
        }
        res.status(200).json({ success: true, comment: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}

export const getSingleVideoComments = async (req, res) => {
    const vId = req.params.id;

    try {
        const result = await Comment.find({ video: vId });
        if (!result || result.length < 1) {
            return res.status(404).json({ success: false, message: "comments not found" });
        }
        res.status(200).json({ success: true, comments: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}





export const updateComment = async (req, res) => {
    // const vId = req.params.id;
    const cId = req.params.id;
    const userId = req.params.uId;

    try {
        const comment = await Comment.findById(cId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "comment not found" });
        }

        if (comment.owner.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "unauthorised access" })
        }

        const result = await Comment.findByIdAndUpdate(cId, req.body, { new: true });

        res.status(200).json({ success: true, comment: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}

export const deleteComment = async (req, res) => {
    const vId = req.params.vId;
    const cId = req.params.id;
    const userId = req.params.uId;

    try {
        const comment = await Comment.findById(cId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "comment not found" });
        }

        if (comment.owner.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "unauthorised access" })
        }

        const result = await Comment.findByIdAndDelete(cId);

        await Video.findByIdAndUpdate(vId, { $pull: { comments: cId } });

        res.status(200).json({ success: true, message: "comment deleted successfully", comment: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}




