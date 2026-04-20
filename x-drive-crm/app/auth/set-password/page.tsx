"use client"

import { useState } from "react";

export default function SetPasswordPage() {
    const [password, setPassword] = useState("");

    async function handleSetPassword(e: any) {
        e.preventDefault();

        const res = await fetch("/api/auth/set-password", {
            method: "POST",
            body: JSON.stringify({ password }),
        });

        const data = await res.json();

        if (res.ok) {
            alert("New password set successfully!");
            window.location.href="/dashboard"
        } else {
            alert(data.message);
        }
    }
    
    return(
        <div>
            <h1>Set New Password</h1>

            <div>
                <form onSubmit={handleSetPassword}>
                    <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password"></input>
                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )

}