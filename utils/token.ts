import type { UserProps } from "../types.js";
import jwt from "jsonwebtoken";
export const generateToken = (user: UserProps) => {
    const palyload = {
        user: {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            avatar: user?.avatar
        }
    }

    return jwt.sign(palyload, process.env.JWT_SECRET as string, {
        expiresIn: "30d",
    })
}