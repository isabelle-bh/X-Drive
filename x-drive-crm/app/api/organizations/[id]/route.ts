import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET one, PATCH (update), DELETE

// get organization with id [id]
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const organization = await prisma.organization.findUnique({
        where: {
            id: params.id
         },
    });

    return NextResponse.json(organization);
}

// update organization with id [id] 
export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const body = await req.json();

    const organization = await prisma.organization.update({
        where: {
            id: params.id
         },
         data: body,
    });

    return NextResponse.json(organization);
}

// delete organization with id [id]
export async function DELETE(
    req: Request,
    { params }: { params: { id: string }}
) {
    const organization = await prisma.organization.delete({
        where: {
            id: params.id,
        }
    });

    return NextResponse.json({ success: true });
}