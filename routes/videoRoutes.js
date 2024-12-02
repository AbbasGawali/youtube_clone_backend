import express from "express";
import { addVideo, deleteVideo, getAllVideos, getSingleChannelVideos, getSingleVideo, updateVideo } from "../controllers/videoController.js"

const router = express.Router();

router.get("/", getAllVideos);

router.get("/:id", getSingleVideo);

router.get("/channelVideos/:id", getSingleChannelVideos);

router.post("/addVideo", addVideo);

router.delete("/deleteVideo/:id/:cId/:uId", deleteVideo);

router.put("/updateVideo/:id/:cId/:uId", updateVideo);


export default router;