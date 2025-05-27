"use client";

import { useRouter} from "next/navigation";

export default function DashboardClient({ email }) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
    };

    return (
        <div>
            <button type="button" onClick={handleLogout}>Logout</button>
            <h1>Welcome to your Dashboard, {email}</h1>
        </div>
    );
}