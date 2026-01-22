import { connectDB } from "@/lib/funcs/connectDB"
import { transporter } from "@/lib/funcs/email"
import { validateEmail } from "@/lib/funcs/validateEmail"
import Otp from "@/lib/schema/otp"
import User from "@/lib/schema/user"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { username, email, password } = await req.json()
    if (!username || !email || !password || username?.length <= 2 || password?.length <= 7) return NextResponse.json({ success: false, error: "Some fields are missing or wrong" }, { status: 404 })
    else if (!validateEmail(email)) return NextResponse.json({ success: false, error: "Invalid Email Address" }, { status: 400 })

    await connectDB()

    const isUserExisted = await User.findOne({ $or: [{ email }, { username }] })
    if (isUserExisted) return NextResponse.json({ success: false, error: "User already existed with either email or username" }, { status: 409 })

    const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)

    const newOtp = new Otp({
        otp: otp,
        expireAt: new Date()
    })
    const { _id } = await newOtp.save()

    await transporter.sendMail({
        to: email,
        subject: `${otp} is OTP for uConnect`,
        text: `Welcome to uConnect ${username}\n\nYour OTP is ${otp} and it will get expire after 1 minute\n\nEnjoy :)`
    })

    return NextResponse.json({ success: true, otpId: _id })
}