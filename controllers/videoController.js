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
    if (!req.body.videoUrl) {
        return res.status(400).json({ success: false, message: "video url is required" });
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

    const { title, thumbnailUrl, videoUrl, description, channelId, uploader } = req.body;


    try {
        const user = await User.findById(uploader);
        const channel = await Channel.findById(channelId);
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" });
        }
        if (!channel) {
            return res.status(400).json({ success: false, message: "create a channel before video upload" })
        }

        if (channel.owner.toString() !== user._id.toString()) {
            return res.status(403).json({ success: false, message: "unauthorised access : channel & user not match" })
        }
        const video = await Video.create({ title, thumbnailUrl, videoUrl, description, channelId, uploader });

        channel.videos.push(video._id);
        await channel.save();

        res.status(201).json({ success: true, message: "video uploaded", video });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "server error" })
    }
}


export const getAllVideos = async (req, res) => {
    try {
        const result = await Video.find();
        if (!result || result.length < 1) {
            return res.status(404).json({ success: false, message: "videos not found" });
        }
        res.status(200).json({ success: true, videos: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}

export const getSingleVideo = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Video.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "video not found" });
        }
        res.status(200).json({ success: true, video: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}

export const getSingleChannelVideos = async (req, res) => {
    const cId = req.params.id;

    try {
        const result = await Video.find({ channelId: cId });
        if (!result || result.length < 1) {
            return res.status(404).json({ success: false, message: "videos not found" });
        }
        res.status(200).json({ success: true, video: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}





export const updateVideo = async (req, res) => {
    const vId = req.params.id;
    const cId = req.params.cId;
    const userId = req.params.uId;
    try {
        const video = await Video.findById(vId);
        if (!video) {
            return res.status(404).json({ success: false, message: "video not found" });
        }

        if (video.uploader.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "unauthorised access" })
        }

        const result = await Video.findByIdAndUpdate(vId, req.body, { new: true });

        res.status(200).json({ success: true, video: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}

export const deleteVideo = async (req, res) => {
    const vId = req.params.id;
    const cId = req.params.cId;
    const userId = req.params.uId;

    try {
        const video = await Video.findById(vId);
        if (!video) {
            return res.status(404).json({ success: false, message: "video not found" });
        }

        if (video.uploader.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "unauthorised access" })
        }

        const result = await Video.findByIdAndDelete(vId);
        await Channel.findByIdAndUpdate(cId, { $pull: { videos: vId } });
 
        res.status(200).json({ success: true, message: "video deleted successfully", video: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}




