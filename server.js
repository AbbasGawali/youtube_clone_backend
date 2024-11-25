import express from "express"
import dotenv from "dotenv"
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("welcome to Youtube_Clone backend")
})

app.listen(port, () => {
    console.log(`listening at port ${port}`)
})