"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/config";

const provider = new GoogleAuthProvider();

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignup = async () => {
        setError("");
        try {
            await signInWithPopup(auth, provider);
            router.push("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <button onClick={handleGoogleSignup}>Sign Up with Google</button>
            <form onSubmit={handleSignup}>
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
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}