import { PrismaClient } from "@prisma/client";

//conexao com o bando de dados
export const prisma = new PrismaClient({
    log: ['query'],
});
