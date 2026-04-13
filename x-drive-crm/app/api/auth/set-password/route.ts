import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

// setting password
export async function POST(req: Request) {

    const {email, password} = await req.json();
    
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