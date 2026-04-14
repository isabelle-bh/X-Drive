import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET one, PATCH (update), DELETE

// get opportunity with id [id]
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const opportunity = await prisma.opportunity.findUnique({
        where: {
            id: params.id
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
                    firstName: true
                }
            }
        }
    });

    return NextResponse.json(opportunity);
}

// update opportunity with id [id] 
export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const body = await req.json();

    const opportunity = await prisma.opportunity.update({
        where: {
            id: params.id
         },
         data: body,
    });

    return NextResponse.json(opportunity);
}

// delete opportunity with id [id]
export async function DELETE(
    req: Request,
    { params }: { params: { id: string }}
) {
    await prisma.opportunity.delete({
        where: {
            id: params.id,
        }
    });

    return NextResponse.json({ success: true });
}