"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCollectionClient() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const response = await fetch("/api/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, description }),
        });

        if(response.ok) {
            router.push("/dashboard");
        } else {
            setError("Failed to create collection");
        }

        setLoading(false);
    }
    
    return (
        <div>
            <button onClick={() => router.back()}>Go back</button>
            <h1>Create a New Collection</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Create"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}