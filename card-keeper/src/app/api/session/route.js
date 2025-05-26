import { NextResponse } from "next/server";
import { adminApp } from "@/firebase/admin";
import { serialize } from "cookie";

export async function POST(request) {
    const { token } = await request.json();

    if(!token) {
        return NextResponse.json({ error: "ID token is required" }, { status: 400 });
    }

    const expirationTime = 60 * 60 * 24 * 7 * 1000; // 7 days

    try {
        const sessionCookie = await adminApp.auth().createSessionCookie(token, { expiresIn: expirationTime });

        const options = {
            maxAge: expirationTime / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        };

        const cookieHeader = serialize("__session", sessionCookie, options);

        const response = NextResponse.json({ success: true });
        response.headers.set("Set-Cookie", cookieHeader);
        return response;
    } catch (error) {
        console.error("[SESSION ERROR]", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}