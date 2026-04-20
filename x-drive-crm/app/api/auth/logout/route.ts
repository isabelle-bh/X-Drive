import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
    const sessionId = (await cookies()).get("session")?.value;

    if (sessionId) {
        await prisma.session.delete({
            where: {id: sessionId}
        })
    }

    (await cookies()).delete("session");

    return NextResponse.json({ success: true })
}