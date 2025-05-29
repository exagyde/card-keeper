import { cookies } from "next/headers";
import { adminApp } from "@/firebase/admin";
import { redirect } from "next/navigation";
import NewCollectionClient from "./client";

export default async function NewCollectionPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("__session")?.value;

    try {
        await adminApp.auth().verifySessionCookie(token);
        return <NewCollectionClient />;
    } catch (error) {
        return redirect("/login");
    }
}