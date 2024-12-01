import Channel from "../models/Channel.js";
import User from "../models/User.js";

export const createChannel = async (req, res) => {

    if (!req.body.channelName) {
        return res.status(400).json({ success: false, message: "channel name is required" });
    }
    if (!req.body.owner) {
        return res.status(400).json({ success: false, message: "channel owner is required" });
    }
    if (!req.body.description) {
        return res.status(400).json({ success: false, message: "channel description is required" });
    }
    if (!req.body.channelLogo) {
        return res.status(400).json({ success: false, message: "channel logo is required" });
    }
    if (!req.body.channelBanner) {
        return res.status(400).json({ success: false, message: "channel banner is required" });
    }

    const { channelName, owner, description, channelLogo, channelBanner } = req.body;
    try {
        const ownerMatch = await User.findOne({ _id: owner });
        const channelMatch = await Channel.findOne({ channelName: channelName });

        if (channelMatch) {
            return res.status(400).json({ success: false, message: "channel name already taken !" });
        }

        if (!ownerMatch) {
            return res.status(403).json({ success: false, message: "invalid credentials" });
        }
        const video = await Channel.create({ channelName, owner, description, channelLogo, channelBanner });
        res.status(201).json({ success: true, message: "channel created", video });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "server error" })
    }
}


export const getAllChannels = async (req, res) => {
    try {
        const result = await Channel.find();
        if (!result || result.length < 1) {
            return res.status(404).json({ success: false, message: "channels not found" });
        }
        res.status(200).json({ success: true, channels: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}

export const getSpecificChannel = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const result = await Channel.findById(id);
        if (!result || result.length < 1) {
            return res.status(404).json({ success: false, message: "channels not found" });
        }
        res.status(200).json({ success: true, channels: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}

export const updateChannel = async (req, res) => {
    const cId = req.params.id;
    const userId = req.params.uId;
    try {
        const channel = await Channel.findById(cId);
        if (!channel) {
            return res.status(404).json({ success: false, message: "channel not found" });
        }

        if (channel.owner.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "unauthorised access" })
        }

        const result = await Channel.findByIdAndUpdate(cId, req.body, { new: true });

        res.status(200).json({ success: true, channel: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}

export const deleteChannel = async (req, res) => {
    const cId = req.params.id;
    const userId = req.params.uId;
    try {
        const channel = await Channel.findById(cId);
        if (!channel) {
            return res.status(404).json({ success: false, message: "channel not found" });
        }
        if (channel.owner.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "unauthorised access" })
        }
        const result = await Channel.findByIdAndDelete(cId);

        res.status(200).json({ success: true, message: "channel deleted successfully", channel: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}
