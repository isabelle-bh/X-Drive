import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

export async function getCurrentUser() {
    const sessionId = (await cookies()).get("session")?.value;

    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: { user: true }
    })

    if (!session) {
        return null
    }

    return session.user
}


export function newPasswordValid(pwd: string) {
    if (pwd.length < 8) {
        return false;
    } else {
        return true;
    }
}