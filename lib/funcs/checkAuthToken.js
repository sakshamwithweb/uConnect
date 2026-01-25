import { cookies } from "next/headers"
import { verifyAuthToken } from "./jwt"

export const checkAuthToken = async () => {
    let response = { success: true };
    const cookieStore = await cookies()
    const authToken = cookieStore.get("authToken")?.value
    if (!authToken) response = { success: false, error: "Unauthorized Request", status: 401 }
    const userDetailsFromJwt = await verifyAuthToken(authToken)
    if (!userDetailsFromJwt || !userDetailsFromJwt?.payload?.username || !userDetailsFromJwt?.payload?.exp || !userDetailsFromJwt?.payload?.exp > Date.now()) response = { success: false, error: "Unauthorized Request", status: 401 }

    if (response.success) response["userDetailsFromJwt"] = userDetailsFromJwt

    return response
}