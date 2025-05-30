"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditCollectionClient({ collection, cards }) {
    const router = useRouter();
    const [name, setName] = useState(collection.name);
    const [description, setDescription] = useState(collection.description);
    const [newCardName, setNewCardName] = useState("");

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

    const handleAddCard = async (e) => {
        e.preventDefault();

        await fetch(`/api/collections/${collection.id}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newCardName })
        });

        setNewCardName("");
        router.refresh();
    }

    const handleDeleteCard = async (cardId) => {
        await fetch(`/api/collections/${collection.id}/cards/${cardId}`, {
            method: "DELETE"
        });
        router.refresh();
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

            <h2>Cards in this collection</h2>
            <form onSubmit={handleAddCard}>
                <input 
                    type="text" 
                    placeholder="New Card Name" 
                    value={newCardName}
                    onChange={(e) => setNewCardName(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>
            {cards.length === 0 ? (
                <p>No cards in this collection.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Card Name</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map(card => (
                            <tr key={card.id}>
                                <td>{card.name}</td>
                                <td>{new Date(card.createdAt).toDateString()}</td>
                                <td>
                                    <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}