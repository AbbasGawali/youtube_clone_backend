import express from "express"
import { createChannel, deleteChannel, getAllChannels, getmultipleChannels, getSpecificChannel, updateChannel } from "../controllers/channelController.js"
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();

router.get("/", getAllChannels);

router.post("/createChannel", checkAuth, createChannel);

router.post("/getmultipleChannels", getmultipleChannels);

router.get("/:id", getSpecificChannel);

router.put("/updateChannel/:id/:uId", checkAuth, updateChannel);

router.delete("/deleteChannel/:id/:uId", checkAuth, deleteChannel);

export default router;