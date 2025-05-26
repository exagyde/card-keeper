import { adminApp } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { token } = await request.json();

    if (!token) {
        return NextResponse.json({ isAuthenticated: false }, { status: 400 });
    }

    try {
        const decodedToken = await adminApp.auth().verifySessionCookie(token, true);
        return NextResponse.json({ isAuthenticated: true, email: decodedToken.email });
    } catch (error) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
}
