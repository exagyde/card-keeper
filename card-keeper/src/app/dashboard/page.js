import { cookies } from "next/headers";
import { adminApp } from "@/firebase/admin";
import { redirect } from "next/navigation";
import { getCollectionsByUser } from "@/utils/firestoreHelpers";
import DashboardClient from "./client";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("__session")?.value;

    try {
        const decodedToken = await adminApp.auth().verifySessionCookie(token);
        const userId = decodedToken.uid;
        const userEmail = decodedToken.email;

        const collections = JSON.parse(JSON.stringify(await getCollectionsByUser(userId)));

        return <DashboardClient email={userEmail} collections={collections} />;
    } catch (error) {
        return redirect("/login");
    }
}  