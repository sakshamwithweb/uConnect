import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { NextResponse } from "next/server"

const s3Client = new S3Client({
    region: process.env.BUCKET_REGION,
    endpoint: process.env.BUCKET_ENDPOINT,
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.BUCKET_KEY_ID,
        secretAccessKey: process.env.BUCKET_SECRET_KEY
    }
})

export async function POST(req) {
    try {
        const { fileName, fileType } = await req.json()

        const username = "sakg"

        // const command = new PutObjectCommand({
        //     Bucket: process.env.BUCKET_NAME,
        //     Key: `${username}/profilepic`,
        //     ContentType: fileType
        // })

        // const signedUrl = await getSignedUrl(s3Client, command)

        return NextResponse.json({ success: true, url: "" })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
    }
}