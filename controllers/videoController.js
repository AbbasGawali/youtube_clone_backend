import Channel from "../models/Channel.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ success: false, message: "video title is required" });
    }

    if (!req.body.thumbnailUrl) {
        return res.status(400).json({ success: false, message: "video thumbnail is required" });
    }
    if (!req.body.description) {
        return res.status(400).json({ success: false, message: "video description is required" });
    }
    if (!req.body.channelId) {
        return res.status(400).json({ success: false, message: "channel is required" });
    }
    if (!req.body.uploader) {
        return res.status(400).json({ success: false, message: "video author is required" });
    }

    const { title, thumbnailUrl, description, channelId, uploader } = req.body;


    try {
        const user = User.findById(uploader);
        const channel = Channel.findById(channelId);
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" });
        }
        if (!channel) {
            return res.status(400).json({ success: false, message: "create a channel before video upload" })
        }
        const video = await Video.create({ title, thumbnailUrl, description, channelId, uploader });
        res.status(201).json({ success: true, message: "video uploaded", video });

    } catch (err) {
        res.status(500).json({ success: false, message: "server error" })
    }
}
