import { NextResponse } from "next/server";
import { adminApp } from "@/firebase/admin";

export async function POST(request, { params }) {
    const { id } = await params;
    
    try {
        const body = await request.json();
        const { name } = body;

        const sessionCookie = request.cookies.get("__session")?.value;
        const decodedToken = await adminApp.auth().verifySessionCookie(sessionCookie, true);

        if(!decodedToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = adminApp.firestore();
        const cardsRef = db.collection("collections").doc(id).collection("cards");
        const cardDoc = await cardsRef.add({
            name,
            createdAt: adminApp.firestore.FieldValue.serverTimestamp()
        });

        return NextResponse.json({ id: cardDoc.id, name }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update collection" }, { status: 500 });
    }
    
}