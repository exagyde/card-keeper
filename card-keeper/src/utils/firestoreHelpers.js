import { adminApp } from "@/firebase/admin";

export async function getCollectionsByUser(userId) {
    const db = adminApp.firestore();
    const collectionsRef = db.collection("collections");

    const snapshot = await collectionsRef.where("userId", "==", userId).get();

    return snapshot.docs.map(doc => (
        { id: doc.id, ...doc.data() }
    ));
}