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

    const body = await req.json();
    
    const organization = await prisma.organization.create({
        data: {
            name: body.name,
            address: body.address,
            website: body.website,
            phone: body.phone,
            ownerId: userId,
        },
    });  

    return NextResponse.json(organization);
}