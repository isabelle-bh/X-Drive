"use client"

import { useState } from 'react'

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: any) {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
        });

        const data = await res.json();

        if (!res.ok) {
            if (data.message === "Password not set yet") {
                window.location.href="/auth/set-password";
            }
            alert(data.message);
            return data.message;
        } else {
            window.location.href="/dashboard";
            alert(data.message);
        }
    }

    return(
        <div>
            <h1>Login</h1>

            <div>
                <form onSubmit={handleLogin}>
                    <input onChange={(e) => setEmail(e.target.value)} placeholder='email' type="email"></input>
                    <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password"></input>
                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )
}