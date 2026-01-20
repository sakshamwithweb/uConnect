"use server"
import User from "../schema/user"
import { connectDB } from "./connectDB"

export const checkUsernameStatus = async (username) => {
    await connectDB()
    const isUsernameAcquired = await User.findOne({ username })
    if (!isUsernameAcquired) return false
    return true
}