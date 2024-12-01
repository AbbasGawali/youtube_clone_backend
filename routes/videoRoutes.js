import express from "express";
import { addVideo } from "../controllers/videoController.js"

const router = express.Router();

// router.get("/", getAllVideos);

// router.get("/:id", getSpecificVideo);

router.post("/addVideo", addVideo);

// router.delete("/deleteVideo/:", deleteVideo);

// router.put("/deleteVideo/:", updateVideo);


export default router;