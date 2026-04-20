import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function HomePage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/auth/login")
    }

    return(
        <div>
            <h1>Home Page</h1>
            <h2>Hello {user.firstName}</h2>
            <div>
                
            </div>
        </div>
    )
} 