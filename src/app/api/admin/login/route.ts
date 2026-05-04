import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createAdminToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE } from "@/lib/session";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const email = String(formData.get("email") ?? "")
            .trim()
            .toLowerCase();
        const password = String(formData.get("password") ?? "");
        const admin = await prisma.adminUser.findUnique({ where: { email } });
        if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
            return NextResponse.redirect(new URL("/admin/login?err=auth", req.url));
        }
        let token: string;
        try {
            token = await createAdminToken(admin.id);
        }
        catch {
            return NextResponse.redirect(new URL("/admin/login?err=config", req.url));
        }
        const target = new URL("/admin", req.url);
        const res = NextResponse.redirect(target, 303);
        res.cookies.set(ADMIN_SESSION_COOKIE, token, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            secure: target.protocol === "https:",
        });
        return res;
    }
    catch (e) {
        console.error("admin login", e);
        return NextResponse.redirect(new URL("/admin/login?err=server", req.url));
    }
}
