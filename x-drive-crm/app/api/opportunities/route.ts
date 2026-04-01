import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET all, POST

// get all opportunities
export async function GET() {
    const userId = "temp-user-id"

    const opportunities = await prisma.opportunity.findMany({
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

    return NextResponse.json(opportunities);
}

// create oppportunity
export async function POST(req: Request) {
    const userId = "temp-user-id";

    const body = await req.json();
    
    const opportunity = await prisma.opportunity.create({
        data: {
            title: body.title,
            value: body.value || null,
            stage: body.stage,
            ownerId: userId,
            organizationId: body.organizationId,
            contactId: body.contactId
        },
    });  

    return NextResponse.json(opportunity);
}