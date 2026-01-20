import { connectDB } from "@/lib/funcs/connectDB";
import { validateEmail } from "@/lib/funcs/validateEmail";
import User from "@/lib/schema/user";
import { NextResponse } from "next/server";


export async function POST(req) {
    const { username, email, password } = await req.json()
    if (!username || !email || !password || username?.length <= 2 || password?.length <= 7) return NextResponse.json({ success: false, error: "Some fields are missing or wrong" }, { status: 404 })
    else if (!validateEmail(email)) return NextResponse.json({ success: false, error: "Invalid Email Address" }, { status: 400 })

    try {
        await connectDB()

        const isUserExisted = await User.findOne({ $or: [{ email: email }, { username: username }] })
        if (isUserExisted) return NextResponse.json({ success: false, error: "User already existed with either email or username" }, { status: 409 })

        const updatedAt = new Date()
        const newUser = new User({ username, email, password, updatedAt })
        await newUser.save()
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
    }
}