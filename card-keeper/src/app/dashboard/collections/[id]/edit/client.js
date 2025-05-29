"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditCollectionClient({ collection }) {
    const router = useRouter();
    const [name, setName] = useState(collection.name);
    const [description, setDescription] = useState(collection.description);

    const handleUpdate = async (e) => {
        e.preventDefault();

        await fetch(`/api/collections/${collection.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, description })
        });
        router.push("/dashboard");
    }

    const handleDelete = async () => {
        await fetch(`/api/collections/${collection.id}`, {
            method: "DELETE"
        });
        router.push("/dashboard");
    }
    
    return (
        <div>
            <button onClick={() => router.back()}>Go back</button>
            <h1>Edit Collection</h1>
            <form onSubmit={handleUpdate}>
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
                <button type="submit">Update</button>
                <button type="button" onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )
}