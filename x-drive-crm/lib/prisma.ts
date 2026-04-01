import { PrismaClient } from "@prisma/client"

// prisma client singleton for db access
// prevents opening too many db connections in development

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}