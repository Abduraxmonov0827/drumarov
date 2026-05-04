"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendAppointmentTelegramNotice } from "@/lib/telegram";
const appointmentSchema = z.object({
    name: z.string().min(2).max(120),
    email: z.string().email().max(200),
    phone: z.string().min(8).max(40),
    departmentId: z.string().min(1),
    preferredDate: z.string().min(1),
    preferredTime: z.string().min(1),
    message: z.string().max(2000).optional(),
});
export async function submitAppointment(_prev: unknown, formData: FormData) {
    const parsed = appointmentSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        departmentId: formData.get("departmentId"),
        preferredDate: formData.get("preferredDate"),
        preferredTime: formData.get("preferredTime"),
        message: formData.get("message") || undefined,
    });
    if (!parsed.success) {
        return { ok: false as const, error: "Ma’lumotlarni tekshirib qayta urinib ko‘ring." };
    }
    const department = await prisma.department.findUnique({
        where: { id: parsed.data.departmentId },
        select: { name: true },
    });
    await prisma.appointment.create({
        data: {
            ...parsed.data,
            message: parsed.data.message || null,
            status: "NEW",
        },
    });
    try {
        await sendAppointmentTelegramNotice({
            name: parsed.data.name,
            email: parsed.data.email,
            phone: parsed.data.phone,
            departmentName: department?.name ?? "Noma’lum bo‘lim",
            preferredDate: parsed.data.preferredDate,
            preferredTime: parsed.data.preferredTime,
            message: parsed.data.message,
        });
    }
    catch {
    }
    revalidatePath("/admin/appointments");
    return { ok: true as const };
}
const contactSchema = z.object({
    name: z.string().min(2).max(120),
    email: z.string().email().max(200),
    phone: z.string().max(40).optional(),
    subject: z.string().max(200).optional(),
    message: z.string().min(5).max(5000),
});
export async function submitContact(_prev: unknown, formData: FormData) {
    const parsed = contactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone") || undefined,
        subject: formData.get("subject") || undefined,
        message: formData.get("message"),
    });
    if (!parsed.success) {
        return { ok: false as const, error: "Xabar matni va boshqa maydonlarni to‘ldiring." };
    }
    await prisma.contactMessage.create({
        data: {
            ...parsed.data,
            phone: parsed.data.phone || null,
            subject: parsed.data.subject || null,
            status: "NEW",
        },
    });
    revalidatePath("/admin/messages");
    return { ok: true as const };
}
