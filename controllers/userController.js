import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


export const getAllUsers = async (req, res) => {
    try {
        const result = await User.find();
        if (!result || result.length < 1) {
            return res.status(404).json({ success: false, message: "users not found" });
        }
        res.status(200).json({ success: true, users: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}
export const getsingleUser = async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: "invalid user" });
    }

    const id = req.params.id;
    try {
        const result = await User.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "user not found" });
        }
        res.status(200).json({ success: true, user: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}


export const signUp = async (req, res) => {

    if (!req.body.userName) {
        return res.status(400).json({ success: false, message: "username is required" });
    }
    if (!req.body.email) {
        return res.status(400).json({ success: false, message: "email is required" });
    }
    if (!req.body.password) {
        return res.status(400).json({ success: false, message: "password is required" });
    }
    if (!req.body.avatar) {
        return res.status(400).json({ success: false, message: "avatar is required" });
    }

    const { email, userName, password, avatar } = req.body;

    try {
        const isMatch = await User.findOne({ email });
        if (isMatch) {
            return res.status(400).json({ success: false, message: "user already exists! please login" });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const result = await User.create({ userName, email, password: hashPass, avatar });
        res.status(201).json({ success: true, message: "signUp success", user: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}

export const logIn = async (req, res) => {

    if (!req.body.email) {
        return res.status(400).json({ success: false, message: "email is required" });
    }
    if (!req.body.password) {
        return res.status(400).json({ success: false, message: "password is required" });
    }

    const { email, password } = req.body;
    try {
        const result = await User.findOne({ email });
        if (!result) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        const passMatch = await bcrypt.compare(password, result.password);

        if (!passMatch) {
            return res.status(403).json({ success: false, message: "invalid password" });
        }

        console.log(passMatch)
        const jwtToken = jwt.sign({ email, userId: result._id }, process.env.JWTSECRET)
        return res.status(200).json({ success: true, message: "login success", user: result, jwtToken });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}