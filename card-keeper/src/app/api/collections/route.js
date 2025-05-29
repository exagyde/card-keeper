import { NextResponse } from "next/server";
import { adminApp } from "@/firebase/admin";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, description } = body;

        const sessionCookie = request.cookies.get("__session")?.value;
        const decodedToken = await adminApp.auth().verifySessionCookie(sessionCookie, true);

        if(!decodedToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = adminApp.firestore();
        const collectionRef = await db.collection("collections").add({
            name,
            description,
            userId: decodedToken.uid,
            createdAt: adminApp.firestore.FieldValue.serverTimestamp(),
            updatedAt: adminApp.firestore.FieldValue.serverTimestamp()
        });

        return NextResponse.json({ id: collectionRef.id, name, description }, { status: 201 });
    } catch (error) {
        console.error("Error creating collection:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}