import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: { 
            email,
        }
    });

    if (!user || !user.password) {
        return new NextResponse("Invalid credentials", { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return new NextResponse("Invalid password", { status: 401 })
    }

    return NextResponse.json({ userId: user.id});
}