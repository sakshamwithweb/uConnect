import { checkAuthToken } from "@/lib/funcs/checkAuthToken"
import { connectDB } from "@/lib/funcs/connectDB"
import { extractFeature, githubDataFetch } from "@/lib/funcs/github"
import UserInfos from "@/lib/schema/userInfos"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { username: githubUsername } = await req.json()
        const data = await githubDataFetch(githubUsername)

        const response = await checkAuthToken()
        if (!response.success) return NextResponse.json({ success: false, error: response.error }, { status: response.status })

        const features = await extractFeature(data)
        console.log(features)

        await connectDB()

        // await UserInfos.updateOne({
        //     username: response.userDetailsFromJwt?.payload?.username, "datas.type": "raw-online"
        // }, {
        //     "$push": {
        //         "datas.$.data": data
        //     }
        // })
        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
    }
}