"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/config";

const provider = new GoogleAuthProvider();

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();

            const response = await fetch("/api/session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: idToken })
            });

            if (!response.ok) throw new Error("Failed to create session");
            router.push("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");

        try {
            const userCredential = await signInWithPopup(auth, provider);
            const idToken = await userCredential.user.getIdToken();

            const response = await fetch("/api/session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: idToken })
            });

            if (!response.ok) throw new Error("Failed to create session");
            router.push("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                    <a href="/forgot-password">Forgot password</a>
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={handleGoogleLogin}>Login with Google</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <a href="/signup">Sign Up</a>
            </form>
        </div>
    );
}