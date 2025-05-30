import { NextResponse } from "next/server";
import { adminApp } from "@/firebase/admin";

export async function DELETE(request, { params }) {
    const { id, cardId } = await params;

    try {
        const sessionCookie = request.cookies.get("__session")?.value;
        const decodedToken = await adminApp.auth().verifySessionCookie(sessionCookie, true);

        if (!decodedToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await adminApp.firestore().collection("collections").doc(id).collection("cards").doc(cardId).delete();
        return NextResponse.json({ message: "Card in collection deleted successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error deleting card in collection:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}