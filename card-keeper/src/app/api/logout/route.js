import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
    const cookie = serialize("__session", "", {
        maxAge: -1,
        path: "/"
    });

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", cookie);
    return response;
}