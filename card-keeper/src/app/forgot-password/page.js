"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Reset email sent");
        } catch(error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div>
            <h1>Forgot password</h1>
            <form onSubmit={handleReset}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset</button>
                {message && <p>{message}</p>}
                <a href="/login">Login</a>
            </form>
        </div>
    )
}