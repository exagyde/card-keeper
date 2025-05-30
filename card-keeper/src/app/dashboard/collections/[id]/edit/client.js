"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function EditCollectionClient({ collection, cards }) {
    const router = useRouter();
    const [name, setName] = useState(collection.name);
    const [description, setDescription] = useState(collection.description);
    const fileInputRef = useRef(null);
    const [newCardFile, setNewCardFile] = useState(null);
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

        if(newCardFile && newCardFile.Size > 1024 * 1024) {
            alert("File size exceeds 1MB limit.");
            return;
        }

        if(newCardFile) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Image = reader.result;
                await fetch(`/api/collections/${collection.id}/cards`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name: newCardName, image: base64Image })
                });
                setNewCardFile(null);
                if(fileInputRef.current) fileInputRef.current.value = null;
            };
            reader.readAsDataURL(newCardFile);
        } else {
            await fetch(`/api/collections/${collection.id}/cards`, {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: newCardName })
            });
        }

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
                    type="file"
                    accept="image/png,image/jpeg"
                    ref={fileInputRef}
                    onChange={(e) => setNewCardFile(e.target.files[0])}
                />
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
                            <th></th>
                            <th>Card Name</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map(card => (
                            <tr key={card.id}>
                                <td>
                                    {card.image ? (
                                        <img src={card.image} alt={card.name} style={{ width: "50px" }} />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
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