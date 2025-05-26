import { cookies } from "next/headers";
import { adminApp } from "@/firebase/admin";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("__session")?.value;

    try {
        const decodedToken = await adminApp.auth().verifySessionCookie(token);
        const userEmail = decodedToken.email;

        return (
            <div>
                <h1>Welcome to your Dashboard, {userEmail}</h1>
            </div>
        );
    } catch (error) {
        return redirect("/login");
    }
}