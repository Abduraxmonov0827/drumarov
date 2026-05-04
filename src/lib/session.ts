import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
const COOKIE = "clinic_admin";
export async function getAdminSession() {
    const token = (await cookies()).get(COOKIE)?.value;
    if (!token)
        return null;
    try {
        const adminId = await verifyAdminToken(token);
        const admin = await prisma.adminUser.findUnique({
            where: { id: adminId },
            select: { id: true, email: true, name: true },
        });
        return admin;
    }
    catch {
        return null;
    }
}
export { COOKIE as ADMIN_SESSION_COOKIE };
