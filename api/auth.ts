import connectDB from "../config/db.js";
import { loginUser, registerUser } from "../controllers/auth.controller.js";


export default async function handler(
    req: any,
    res: any
) {
    await connectDB();

    // POST /api/auth/login
    if (req.method === "POST" && req.url?.endsWith("/login")) {
        return loginUser(req as any, res as any);
    }

    // POST /api/auth/register
    if (req.method === "POST" && req.url?.endsWith("/register")) {
        return registerUser(req as any, res as any);
    }

    return res.status(404).json({ message: "Route not found" });
}
