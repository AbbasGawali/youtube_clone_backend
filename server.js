import express from "express"
import dotenv from "dotenv"
dotenv.config();
import "./config/connection.js"
import userRoutes from "./routes/userRoutes.js"
import channelRoutes from "./routes/channelRoutes.js"
import videoRoutes from "./routes/videoRoutes.js"
const app = express();
const port = process.env.PORT || 8000;

// middleware usage
app.use(express.json());
app.use("/api/users", userRoutes)
app.use("/api/channel", channelRoutes)
app.use("/api/video", videoRoutes)


app.get("/", (req, res) => {
    res.send("welcome to Youtube_Clone backend")
})

app.listen(port, () => {
    console.log(`listening at port ${port}`)
})