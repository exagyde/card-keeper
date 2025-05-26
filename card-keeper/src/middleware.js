import { NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/signup"];
const PROTECTED_ROUTES = ["/dashboard"];

export async function middleware(request) {
    const sessionCookie = request.cookies.get("__session")?.value;
    const { pathname } = request.nextUrl;

    let isAuthenticated = false;

    if (sessionCookie) {
        try {
            const response = await fetch(new URL("/api/verify-session", request.url), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: sessionCookie })
            });

            const result = await response.json();
            isAuthenticated = result.isAuthenticated;
        } catch (error) {
            console.error("[MIDDLEWARE] Session verification failed:", error);
            isAuthenticated = false;
        }
    }

    if(AUTH_ROUTES.includes(pathname) && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if(PROTECTED_ROUTES.some(route => pathname.startsWith(route)) && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/signup", "/dashboard"]
};