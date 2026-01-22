import { jwtVerify, SignJWT } from 'jose'
import crypto from "crypto"

export const verifyAuthToken = async (authToken) => {
    try {
        const isVerified = await jwtVerify(authToken, new TextEncoder().encode(process.env.JWT_SECRET))
        if (isVerified) return isVerified
        return null
    } catch (error) {
        return null
    }
}

export const signJwtToken = async (payload, expiresIn) => {
    const secretKey = crypto.createSecretKey(process.env.JWT_SECRET)
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secretKey)
    return token
}