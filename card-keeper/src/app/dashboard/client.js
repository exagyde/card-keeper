"use client";

import { useRouter} from "next/navigation";

export default function DashboardClient({ email, collections }) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
    };

    const handleDeleteCollection = async (id) => {
        await fetch(`/api/collections/${id}`, {
            method: "DELETE"
        });
        router.refresh();
    }

    return (
        <div>
            <button type="button" onClick={handleLogout}>Logout</button>
            <h1>Welcome to your Dashboard, {email}</h1>
            <a href="/dashboard/collections/new">+ New collection</a>
            {collections.length === 0 ? (
                <p>Collections empty.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collections.map((collection) => (
                            <tr key={collection.id}>
                                <td>{collection.name}</td>
                                <td>{new Date(collection.createdAt).toDateString()}</td>
                                <td>{new Date(collection.updatedAt).toDateString()}</td>
                                <td>
                                    <a href={`/dashboard/collections/${collection.id}/edit`}>Edit</a>
                                    <button type="button" onClick={() => handleDeleteCollection(collection.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}