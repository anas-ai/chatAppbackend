import type { Request, Response } from "express";
import User from "../modals/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";


export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name, avatar } = req.body;
    try {
        // check if user alredy exists
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ success: false, msg: "User already exists" })
            return
        }
        // create a new user
        user = new User({
            email,
            password,
            name,
            avatar: avatar || ""
        })

        // hash the password

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        // save the user 

        await user.save();

        // gen token
        const token = generateToken(user)
        res.json({
            success: true,
            token,
        })

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ success: false, msg: "Server error" })

    }
}


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, msg: "Invalid credentials" });
            return
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ success: true, msg: "Invalid credentials" });
            return;
        }

        const token = generateToken(user);

        res.json({
            success: true,
            token,
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }

        })
    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ success: false, msg: "Server error" })
    }
}




