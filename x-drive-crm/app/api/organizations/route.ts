import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET all, POST

// get all organizations
export async function GET() {
    const userId = "temp-user-id"

    const organizations = await prisma.organization.findMany({
        where: { 
            ownerId: 
            userId 
        },
        include: { 
            contacts: { 
                select: { 
                    id: true, 
                    name: true 
                }
            },
            opportunities: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    });

    return NextResponse.json(organizations);
}

// create new organization
export async function POST(req: Request) {
    const userId = "temp-user-id";

    const formData = await req.formData();
    
    const organization = await prisma.organization.create({
        data: {
            name: formData.get("name") as string,
            address: formData.get("address") as string,
            website: formData.get("website") as string,
            phone: formData.get("phone") as string,
            ownerId: userId,
        },
    });  

    return NextResponse.json(organization);
}