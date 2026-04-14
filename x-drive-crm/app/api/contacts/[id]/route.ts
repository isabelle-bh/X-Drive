import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET one, PATCH (update), DELETE

// get contact with id [id]
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const contact = await prisma.contact.findUnique({
        where: {
            id: params.id
         },
        include: {
            organization: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });

    return NextResponse.json(contact);
}

// update contact with id [id]
export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const body = await req.json();

    const contact = await prisma.contact.update({
        where: {
            id: params.id
         },
         data: body,
    });

    return NextResponse.json(contact);
}

// delete contact with id [id]
export async function DELETE(
    req: Request,
    { params }: { params: { id: string }}
) {
    await prisma.contact.delete({
        where: {
            id: params.id,
        }
    });

    return NextResponse.json({ success: true });
}