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

        if (res.status === 401) {
            alert("invalid login");
        } else {
            window.location.href="/dashboard"
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