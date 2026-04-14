import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET all, POST

// get all users
export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

// create user
export async function POST(req: Request) {

    const body = await req.json();
    
    const user = await prisma.user.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
        },
    });  

    return NextResponse.json(user);
}