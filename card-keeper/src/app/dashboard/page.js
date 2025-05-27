import { cookies } from "next/headers";
import { adminApp } from "@/firebase/admin";
import { redirect } from "next/navigation";
import DashboardClient from "./client";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("__session")?.value;

    try {
        const decodedToken = await adminApp.auth().verifySessionCookie(token);
        const userEmail = decodedToken.email;

        return <DashboardClient email={userEmail} />;
    } catch (error) {
        return redirect("/login");
    }
}  