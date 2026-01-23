import { connectDB } from "@/lib/funcs/connectDB";
import Otp from "@/lib/schema/otp";
import User from "@/lib/schema/user";
import { NextResponse } from "next/server";
import { SignJWT } from "jose"
import crypto from "crypto"
import { signJwtToken } from "@/lib/funcs/jwt";
import UserInfos from "@/lib/schema/userInfos";

export async function POST(req) {
    const { otp, otpId, username, email, password } = await req.json()
    try {
        await connectDB()

        const isOtpMatched = await Otp.findOne({ _id: otpId, otp: parseInt(otp) })
        if (!isOtpMatched) return NextResponse.json({ success: false, error: "Otp is incorrect" })

        const updatedAt = new Date()
        const newUser = new User({ username, email, password, updatedAt })
        const newUserInfos = new UserInfos({ username })
        await newUser.save()
        await newUserInfos.save()

        const tokenExpiresIn = "1d"
        const authToken = await signJwtToken({ username: username }, tokenExpiresIn)

        const response = NextResponse.json({ success: true })
        response.cookies.set('authToken', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "lax",
            maxAge: tokenExpiresIn,
            path: "/"
        })
        return response
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
    }
}