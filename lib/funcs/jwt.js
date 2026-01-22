import { jwtVerify } from 'jose'

export const verifyAuthToken = async (authToken) => {
    try {
        const isVerified = await jwtVerify(authToken, new TextEncoder().encode(process.env.JWT_SECRET))
        if (isVerified) return isVerified
        return null
    } catch (error) {
        return null
    }
}