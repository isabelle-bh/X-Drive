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

    const formData = await req.formData();
    
    const contact = await prisma.contact.create({
        data: {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            title: formData.get("title") as string,
            organizationId: formData.get("organizationId") as string,
            ownerId: userId,
        },
    });  

    return NextResponse.json(contact);
}