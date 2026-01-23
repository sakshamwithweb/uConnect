import { connectDB } from "@/lib/funcs/connectDB"
import { verifyAuthToken } from "@/lib/funcs/jwt"
import UserInfos from "@/lib/schema/userInfos"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req) {
    const payload = await req.json()
    return NextResponse.json({ success: true })
}

export async function GET() {
    try {
        const cookieStore = await cookies()
        const authToken = cookieStore.get("authToken")?.value
        if (!authToken) return NextResponse.json({ success: false, error: "Unauthorized Request" }, { status: 401 })
        const userDetailsFromJwt = await verifyAuthToken(authToken)
        if (!userDetailsFromJwt || !userDetailsFromJwt?.payload?.username || !userDetailsFromJwt?.payload?.exp || !userDetailsFromJwt?.payload?.exp > Date.now()) return NextResponse.json({ success: false, error: "Unauthorized Request" }, { status: 401 })

        await connectDB()

        const userInfos = await UserInfos.findOne({ username: userDetailsFromJwt.payload.username }, "-__v -_id ")
        if (!userInfos) return NextResponse.json({ success: false, error: "User not found" }, { status: 401 })

        return NextResponse.json({ success: true, userInfos })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
    }
}