import { checkAuthToken } from "@/lib/funcs/checkAuthToken"
import { connectDB } from "@/lib/funcs/connectDB"
import UserInfos from "@/lib/schema/userInfos"
import { NextResponse } from "next/server"
import URLParse from "url-parse"

export async function POST(req) {
    const payload = await req.json()
    return NextResponse.json({ success: true })
}

export async function GET(req) {
    try {
        const response = await checkAuthToken()
        if (!response.success) return NextResponse.json({ success: false, error: response.error }, { status: response.status })

        await connectDB()

        const queries = (new URLParse(req.url)).query.slice(1).split("&")

        const type = queries.find((v) => v.split("=")[0] == "type")

        const username = type.split("=")[1] == "self" ? response.userDetailsFromJwt.payload.username : queries.find((v) => v.split("=")[0] == "username").split("=")[1]

        const userInfos = await UserInfos.findOne({ username: username }, "-__v -_id ")
        if (!userInfos) return NextResponse.json({ success: false, error: "User not found" }, { status: 401 })

        return NextResponse.json({ success: true, userInfos })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
    }
}