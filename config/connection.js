import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const connectDB = async () => {
    try {

        let connection = await mongoose.connect(process.env.MONGOURI, { dbName: "youtubeClone" });
        if (connection) {
            console.log("connection Success")
        }
    } catch (err) {
        console.log("connection failed with error : " + err);
    }
}
connectDB();