import { cookies } from "next/headers";
import { adminApp } from "@/firebase/admin";
import { redirect } from "next/navigation";
import { sanitizeForClient } from "@/utils/sanitize";
import EditCollectionClient from "./client";

export default async function EditCollectionPage({ params }) {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("__session")?.value;

    try {
        const decodedToken = await adminApp.auth().verifySessionCookie(token, true);
        const db = adminApp.firestore();
        const collectionRef = await db.collection("collections").doc(id).get();

        if(!collectionRef.exists || collectionRef.data().userId !== decodedToken.uid) {
            return redirect("/dashboard");
        }

        const rawCollection = { id: collectionRef.id, ...collectionRef.data() };
        const collection = sanitizeForClient(rawCollection);

        const cardsRef = await db.collection("collections").doc(id).collection("cards").get();
        const rawCards = cardsRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const cards = rawCards.map(card => sanitizeForClient(card));

        return <EditCollectionClient collection={collection} cards={cards} />;
    } catch (error) {
        return redirect("/login");
    }
}