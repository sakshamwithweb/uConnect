import { checkAuthToken } from "@/lib/funcs/checkAuthToken";
import { connectDB } from "@/lib/funcs/connectDB";
import UserInfos from "@/lib/schema/userInfos";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = await checkAuthToken()
        if (!response.success) return NextResponse.json({ success: false, error: response.error }, { status: response.status })

        const username = response.userDetailsFromJwt.payload.username

        await connectDB()

        // Get embedded vector
        const { embedding } = await UserInfos.findOne({ username })
        if (!embedding) return NextResponse.json({ success: false, error: "User embeddings not found" }, { status: 409 })

        // Match vector with other's embedded vectors
        const results = await UserInfos.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "embedding",
                    queryVector: embedding,
                    numCandidates: 200,
                    limit: 5
                }
            },
            {
                $project: {
                    _id: 1,
                    score: { $meta: "vectorSearchScore" }
                }
            }
        ])

        console.log(results)

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: "something went wrong" }, { status: 500 })
    }
}