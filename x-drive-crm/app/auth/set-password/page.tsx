"use client"

import { useState } from "react";
import { newPasswordValid } from "@/lib/auth"

export default function SetPasswordPage() {
    const [password, setPassword] = useState("");

    async function handleSetPassword(e: any) {
        e.preventDefault();

        if (newPasswordValid(password)) {
            const res = await fetch("/api/auth/set-password", {
                method: "POST",
                body: JSON.stringify({ password }),
            });
            if (res.status === 200) {
                alert("New password set successfully!");
                window.location.href="/dashboard"
            }
        } else {
            alert("Error: Password must be at least 8 characters long!");
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