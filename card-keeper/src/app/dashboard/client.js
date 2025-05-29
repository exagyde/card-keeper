"use client";

import { useRouter} from "next/navigation";

export default function DashboardClient({ email, collections }) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
    };

    return (
        <div>
            <button type="button" onClick={handleLogout}>Logout</button>
            <h1>Welcome to your Dashboard, {email}</h1>
            <a href="/dashboard/collections/new">+ New collection</a>
            {collections.length === 0 ? (
                <p>Collections empty.</p>
            ) : (
                <ul>
                    {collections.map((collection) => (
                        <li key={collection.id}>{collection.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}