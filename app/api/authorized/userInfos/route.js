import { checkAuthToken } from "@/lib/funcs/checkAuthToken"
import { connectDB } from "@/lib/funcs/connectDB"
import UserInfos from "@/lib/schema/userInfos"
import { NextResponse } from "next/server"

export async function POST(req) {
    const payload = await req.json()
    return NextResponse.json({ success: true })
}

export async function GET() {
    try {
        const response = await checkAuthToken()
        if (!response.success) return NextResponse.json({ success: false, error: response.error }, { status: response.status })

        await connectDB()

        const userInfos = await UserInfos.findOne({ username: response.userDetailsFromJwt.payload.username }, "-__v -_id ")
        if (!userInfos) return NextResponse.json({ success: false, error: "User not found" }, { status: 401 })

        return NextResponse.json({ success: true, userInfos })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
    }
}