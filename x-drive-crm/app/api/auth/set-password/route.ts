import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { newPasswordValid } from "@/lib/auth"
import { cookies } from "next/headers"

// setting password
export async function POST(req: Request) {
    const email = (await cookies()).get("temp-email")?.value;
    if (!email) {
        return new NextResponse(JSON.stringify({message: "Session expired. Please attempt log in again.", redirect: "/auth/login" }), {status: 401},);
    }

    const {password} = await req.json();

    if (!newPasswordValid(password)) {
        return new NextResponse(JSON.stringify({message: "Password must be at least 8 characters long." }), {status: 400});
    }
    
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
        where: {email},
        data: {
            password: hashed,
            isActive: true,
        }
    });

    return NextResponse.json(user);
} 