import { Octokit } from "@octokit/core"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { username } = await req.json()

        const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

        const { status, data } = await octokit.request(`GET /users/${username}`)

        if (status != 200) throw new Error("Error")

        return NextResponse.json({ success: true, data })
    } catch (error) {
        // console.log(error)
        return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
    }
}