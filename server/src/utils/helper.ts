import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

export const getPrisma = (prisma_url: string) => {
    return new PrismaClient({
        datasourceUrl: prisma_url
    }).$extends(withAccelerate());
}