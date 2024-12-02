import express from "express"
import { createChannel, deleteChannel, getAllChannels, getSpecificChannel, updateChannel } from "../controllers/channelController.js"
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();

router.get("/", getAllChannels);

router.get("/:id", getSpecificChannel);

router.post("/createChannel", checkAuth, createChannel);

router.put("/updateChannel/:id/:uId", updateChannel);

router.delete("/deleteChannel/:id/:uId", deleteChannel);

export default router;