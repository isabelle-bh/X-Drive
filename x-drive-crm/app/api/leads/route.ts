import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET all, POST

// get all leads
export async function GET() {
    const userId = "temp-user-id"

    const leads = await prisma.lead.findMany({
        where: { 
            ownerId: userId 
        },
        include: { 
            organization: {
                select: {
                    id: true,
                    name: true,
                }
            },
            contact: { 
                select: { 
                    id: true, 
                    firstName: true,
                    lastName: true,
                }
            }
        }
    });

    return NextResponse.json(leads);
}

// create lead
export async function POST(req: Request) {
    const userId = "temp-user-id";

    const body = await req.json();
    
    const lead = await prisma.lead.create({
        data: {
            title: body.title,
            value: body.value || null,
            ownerId: userId,
            contactId: body.contactId
        },
    });  

    return NextResponse.json(lead);
}