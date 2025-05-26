import { cookies } from "next/headers";
import { adminApp } from "@/firebase/admin";
import { redirect } from "next/navigation";

export default async function HomePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("__session")?.value;

    try {
        await adminApp.auth().verifySessionCookie(token);
        return redirect("/dashboard");
    } catch (error) {
        return redirect("/login");
    }
}