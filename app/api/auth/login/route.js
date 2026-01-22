import { connectDB } from "@/lib/funcs/connectDB"
import { validateEmail } from "@/lib/funcs/validateEmail"
import User from "@/lib/schema/user"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { signJwtToken } from "@/lib/funcs/jwt"

export async function POST(req) {
    const { email, password } = await req.json()
    if (!email || !password || password?.length <= 7) return NextResponse.json({ success: false, error: "Some fields are missing or wrong" }, { status: 400 })
    else if (!validateEmail(email)) return NextResponse.json({ success: false, error: "Invalid Email Address" }, { status: 400 })

    await connectDB()
    const isUserExisted = await User.findOne({ email })
    if (!email) return NextResponse.json({ success: false, error: "Wrong credentials" }, { status: 401 })
    const isPasswordCorrect = await bcrypt.compare(password, isUserExisted.password)
    if (!isPasswordCorrect) return NextResponse.json({ success: false, error: "Wrong credentials" }, { status: 401 })

    // Here now generate jwt
    const tokenExpiresIn = "1d"
    const authToken = await signJwtToken({ username: isUserExisted.username }, tokenExpiresIn)

    const response = NextResponse.json({ success: true })
    response.cookies.set('authToken', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "lax",
        maxAge: tokenExpiresIn,
        path: "/"
    })
    return response
}