import { NextResponse } from "next/server";
import { verifyAuthToken } from "./lib/funcs/jwt";

export async function middleware(request) {
    const authToken = request.cookies.get("authToken")?.value

    const protectedRoutes = ["/dashboard", "/profile"]
    const notForAuthorizedRoutes = ["/login", "/signup"]

    const isProtectedRoute = protectedRoutes.find((route) => request.nextUrl.pathname.startsWith(route))

    if (isProtectedRoute) {
        if (!authToken) return NextResponse.redirect(new URL('/login', request.url))

        const isTokenVerified = await verifyAuthToken(authToken)
        if (!isTokenVerified) return NextResponse.redirect(new URL('/login', request.url))
    } else {
        const isNotForAuthorizedRoutes = notForAuthorizedRoutes.find((route) => request.nextUrl.pathname.startsWith(route))
        if (isNotForAuthorizedRoutes) {
            const isTokenVerified = await verifyAuthToken(authToken)
            if (isTokenVerified) return NextResponse.redirect(new URL("/dashboard", request.url))
        }
    }


    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}