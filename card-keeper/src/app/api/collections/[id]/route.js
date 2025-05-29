import { NextResponse } from "next/server";
import { adminApp } from "@/firebase/admin";

export async function PATCH(request, { params }) {
    const { id } = await params;

    try {
        const body = await request.json();
        const { name, description } = body;

        const sessionCookie = request.cookies.get("__session")?.value;
        const decodedToken = await adminApp.auth().verifySessionCookie(sessionCookie, true);

        if(!decodedToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await adminApp.firestore().collection("collections").doc(id).update({
            name,
            description,
            updatedAt: adminApp.firestore.FieldValue.serverTimestamp()
        });
        return NextResponse.json({ message: "Collection updated successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error deleting collection:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = await params;

    try {
        const sessionCookie = request.cookies.get("__session")?.value;
        const decodedToken = await adminApp.auth().verifySessionCookie(sessionCookie, true);

        if(!decodedToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await adminApp.firestore().collection("collections").doc(id).delete();
        return NextResponse.json({ message: "Collection deleted successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error deleting collection:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}