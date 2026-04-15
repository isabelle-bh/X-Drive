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

        
    }

}