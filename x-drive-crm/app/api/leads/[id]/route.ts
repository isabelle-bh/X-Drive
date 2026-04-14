import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET one, PATCH (update), DELETE

// get lead with id [id]
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const lead = await prisma.lead.findUnique({
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

    return NextResponse.json(lead);
}

// update lead with id [id] 
export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const body = await req.json();

    const lead = await prisma.lead.update({
        where: {
            id: params.id
         },
         data: body,
    });

    return NextResponse.json(lead);
}

// delete lead with id [id]
export async function DELETE(
    req: Request,
    { params }: { params: { id: string }}
) {
    await prisma.lead.delete({
        where: {
            id: params.id,
        }
    });

    return NextResponse.json({ success: true });
}