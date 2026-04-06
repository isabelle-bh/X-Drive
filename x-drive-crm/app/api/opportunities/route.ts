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
            lead: {
                select: {
                    id: true,
                    title: true,
                }
            },
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

    const formData = await req.formData();
    
    const opportunity = await prisma.opportunity.create({
        data: {
            title: formData.get("title") as string,
            value: Number(formData.get("value")),
            stage: formData.get("stage") as string,
            organizationId: formData.get("organizationId") as string,
            contactId: formData.get("contactId") as string,
            ownerId: userId,
        },
    });  

    return NextResponse.json(opportunity);
}