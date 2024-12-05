import express from "express";
import { addVideo, deleteVideo, getAllVideos, getSingleChannelVideos, getSingleVideo, updateVideo } from "../controllers/videoController.js"
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/", getAllVideos);

router.get("/:id", getSingleVideo);

router.get("/channelVideos/:id", getSingleChannelVideos);

router.post("/addVideo", checkAuth, addVideo);

router.delete("/deleteVideo/:id/:cId/:uId", checkAuth, deleteVideo);

router.put("/updateVideo/:id/:cId/:uId", checkAuth, updateVideo);


export default router;