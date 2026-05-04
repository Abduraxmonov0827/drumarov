import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL o‘rnatilmagan.");
}
if (!/^postgres(ql)?:\/\//i.test(databaseUrl)) {
    throw new Error(
        "DATABASE_URL PostgreSQL bo‘lishi kerak (postgresql://…). `.env` da file:./… (SQLite) qolib ketgan bo‘lsa, Neon string bilan almashtiring.",
    );
}
const adapter = new PrismaPg({ connectionString: databaseUrl });
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
