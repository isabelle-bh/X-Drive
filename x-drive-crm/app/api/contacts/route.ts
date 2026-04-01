import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET all, POST

// get all contacts
export async function GET() {
    const userId = "temp-user-id"

    const contacts = await prisma.contact.findMany({
        where: { 
            ownerId: userId
        },
        include: { 
            organization: { 
                select: { 
                    id: true, 
                    name: true 
                }
            }
        }
    });

    return NextResponse.json(contacts);
}

// create new contact
export async function POST(req: Request) {
    const userId = "temp-user-id";

    const body = await req.json();
    
    const contact = await prisma.contact.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName || null,
            email: body.email,
            phone: body.phone || null,
            title: body.title || null,
            ownerId: userId,
            organizationId: body.organizationId
        },
    });  

    return NextResponse.json(contact);
}