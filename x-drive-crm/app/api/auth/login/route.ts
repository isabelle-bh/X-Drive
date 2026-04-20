import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { randomUUID } from "crypto"

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: { 
            email,
        }
    });

    if (!user) {
        return new NextResponse(JSON.stringify({message: "Invalid user"}), { status: 400 });
    }

    if (!user.password) {
        (await cookies()).set("temp-email", email, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 10 // 10 mins
        })
        
        return new NextResponse(JSON.stringify({message: "Password not set yet"}), {status: 400});
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return new NextResponse(JSON.stringify({message: "Invalid password"}), { status: 401 })
    }

    const sessionId = randomUUID();

    await prisma.session.create({
        data: {
            id: sessionId,
            userId: user.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
        }
    });

    (await cookies()).set("session", sessionId, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    })

    return NextResponse.json({ userId: user.id});
}