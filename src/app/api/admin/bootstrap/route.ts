import { timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function timingSafeStringEqual(a: string, b: string): boolean {
    const ba = Buffer.from(a, "utf8");
    const bb = Buffer.from(b, "utf8");
    if (ba.length !== bb.length) {
        return false;
    }
    return timingSafeEqual(ba, bb);
}

/** Bir martalik: Vercelda DATABASE_URL bilan bir xil bazada admin yaratish (npm seed ishlamasa). Keyin env dan olib tashlang. */
export async function POST(req: Request) {
    const expected = process.env.ADMIN_BOOTSTRAP_TOKEN;
    if (!expected || expected.length < 32) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const header = req.headers.get("x-admin-bootstrap") ?? "";
    if (!timingSafeStringEqual(header, expected)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const hash = await bcrypt.hash("admin123", 10);
    await prisma.adminUser.upsert({
        where: { email: "admin@klinika.uz" },
        update: {
            passwordHash: hash,
            name: "Administrator",
        },
        create: {
            email: "admin@klinika.uz",
            passwordHash: hash,
            name: "Administrator",
        },
    });
    return NextResponse.json({
        ok: true,
        email: "admin@klinika.uz",
        password: "admin123",
        next: "Verceldan ADMIN_BOOTSTRAP_TOKEN ni o‘chirib, qayta deploy qiling.",
    });
}
