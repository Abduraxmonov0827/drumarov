"use server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE } from "@/lib/session";
export type AdminLoginState = {
    error?: string;
} | undefined;
export async function adminLogin(_prev: AdminLoginState, formData: FormData): Promise<AdminLoginState> {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
        return { error: "Email yoki parol noto‘g‘ri." };
    }
    const token = await createAdminToken(admin.id);
    (await cookies()).set(ADMIN_SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
    });
    redirect("/admin");
}
export async function adminLogout() {
    (await cookies()).delete(ADMIN_SESSION_COOKIE);
    redirect("/admin/login");
}
