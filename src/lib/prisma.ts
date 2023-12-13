
import { env } from "@/env";
//importa biblioteca prisma
import { PrismaClient } from "@prisma/client";


//exportar conexão com banco 
export const prisma = new PrismaClient({
    log: env.NODE_ENV === "dev" ? ['query'] : [],
})