"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isLocalUploadPath, removeLocalUploadFile, saveUploadedImage } from "@/lib/save-uploaded-image";
import { slugify } from "@/lib/slug";
import { getAdminSession } from "@/lib/session";
import { locales } from "@/lib/i18n";
async function requireAdmin() {
    const s = await getAdminSession();
    if (!s)
        throw new Error("Ruxsat yo‘q");
}
function revalidateLocalized(path: string) {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    revalidatePath(normalized);
    for (const locale of locales) {
        revalidatePath(normalized === "/" ? `/${locale}` : `/${locale}${normalized}`);
    }
}
async function resolveImageField(formData: FormData, options: {
    fileField: string;
    urlField: string;
    removeField: string;
    subdir: "doctors" | "blog";
    previousUrl: string | null;
}): Promise<string | null> {
    const { fileField, urlField, removeField, subdir, previousUrl } = options;
    if (formData.get(removeField) === "1") {
        await removeLocalUploadFile(previousUrl);
        return null;
    }
    const file = formData.get(fileField);
    if (file instanceof File && file.size > 0) {
        const nextUrl = await saveUploadedImage(file, subdir);
        if (previousUrl && previousUrl !== nextUrl && isLocalUploadPath(previousUrl))
            await removeLocalUploadFile(previousUrl);
        return nextUrl;
    }
    const typed = String(formData.get(urlField) ?? "").trim();
    if (typed) {
        if (previousUrl && previousUrl !== typed && isLocalUploadPath(previousUrl))
            await removeLocalUploadFile(previousUrl);
        return typed;
    }
    return previousUrl;
}
export async function saveDoctor(formData: FormData) {
    await requireAdmin();
    const id = (formData.get("id") as string) || undefined;
    const name = String(formData.get("name") ?? "").trim();
    let slug = String(formData.get("slug") ?? "").trim();
    if (!slug)
        slug = slugify(name);
    const previousUrl = id
        ? (await prisma.doctor.findUnique({ where: { id }, select: { imageUrl: true } }))?.imageUrl ?? null
        : null;
    const imageUrl = await resolveImageField(formData, {
        fileField: "imageFile",
        urlField: "imageUrl",
        removeField: "removeImage",
        subdir: "doctors",
        previousUrl,
    });
    const data = {
        name,
        slug,
        specialty: String(formData.get("specialty") ?? "").trim(),
        bio: String(formData.get("bio") ?? "").trim(),
        bioDetailed: String(formData.get("bioDetailed") ?? "").trim(),
        imageUrl,
        email: String(formData.get("email") ?? "").trim() || null,
        phone: String(formData.get("phone") ?? "").trim() || null,
        experienceYears: Number(formData.get("experienceYears") || 0) || null,
        treatmentAreas: String(formData.get("treatmentAreas") ?? "").trim(),
        departmentId: String(formData.get("departmentId") ?? "").trim() || null,
        sortOrder: Number(formData.get("sortOrder") || 0) || 0,
    };
    if (id) {
        await prisma.doctor.update({ where: { id }, data });
    }
    else {
        await prisma.doctor.create({ data });
    }
    revalidateLocalized("/shifokorlar");
    revalidateLocalized("/");
    revalidatePath("/admin/doctors");
}
export async function deleteDoctor(id: string) {
    await requireAdmin();
    const prev = await prisma.doctor.findUnique({ where: { id }, select: { imageUrl: true, slug: true } });
    await removeLocalUploadFile(prev?.imageUrl);
    await prisma.doctor.delete({ where: { id } });
    revalidateLocalized("/shifokorlar");
    revalidateLocalized("/");
    if (prev?.slug)
        revalidateLocalized(`/shifokorlar/${prev.slug}`);
    revalidatePath("/admin/doctors");
}
export async function saveService(formData: FormData) {
    await requireAdmin();
    const id = (formData.get("id") as string) || undefined;
    const name = String(formData.get("name") ?? "").trim();
    let slug = String(formData.get("slug") ?? "").trim();
    if (!slug)
        slug = slugify(name);
    const data = {
        name,
        slug,
        description: String(formData.get("description") ?? "").trim(),
        sortOrder: Number(formData.get("sortOrder") || 0) || 0,
        departmentId: String(formData.get("departmentId") ?? "").trim() || null,
    };
    if (id) {
        await prisma.service.update({ where: { id }, data });
    }
    else {
        await prisma.service.create({ data });
    }
    revalidateLocalized("/xizmatlar");
    revalidateLocalized("/");
    revalidatePath("/admin/services");
}
export async function deleteService(id: string) {
    await requireAdmin();
    await prisma.service.delete({ where: { id } });
    revalidateLocalized("/xizmatlar");
    revalidateLocalized("/");
    revalidatePath("/admin/services");
}
export async function saveDepartment(formData: FormData) {
    await requireAdmin();
    const id = (formData.get("id") as string) || undefined;
    const name = String(formData.get("name") ?? "").trim();
    let slug = String(formData.get("slug") ?? "").trim();
    if (!slug)
        slug = slugify(name);
    const data = {
        name,
        slug,
        shortDescription: String(formData.get("shortDescription") ?? "").trim(),
        description: String(formData.get("description") ?? "").trim(),
        icon: String(formData.get("icon") ?? "Building2").trim() || "Building2",
        sortOrder: Number(formData.get("sortOrder") || 0) || 0,
    };
    if (id) {
        await prisma.department.update({ where: { id }, data });
    }
    else {
        await prisma.department.create({ data });
    }
    revalidateLocalized("/bolimlar");
    revalidateLocalized("/");
    revalidatePath("/admin/departments");
}
export async function deleteDepartment(id: string) {
    await requireAdmin();
    await prisma.department.delete({ where: { id } });
    revalidateLocalized("/bolimlar");
    revalidateLocalized("/");
    revalidatePath("/admin/departments");
}
export async function saveBlogPost(formData: FormData) {
    await requireAdmin();
    const id = (formData.get("id") as string) || undefined;
    const title = String(formData.get("title") ?? "").trim();
    let slug = String(formData.get("slug") ?? "").trim();
    if (!slug)
        slug = slugify(title);
    const status = String(formData.get("status") ?? "DRAFT");
    const publishedAt = status === "PUBLISHED"
        ? new Date(String(formData.get("publishedAt") || new Date().toISOString()))
        : null;
    const previousUrl = id
        ? (await prisma.blogPost.findUnique({ where: { id }, select: { imageUrl: true } }))?.imageUrl ?? null
        : null;
    const imageUrl = await resolveImageField(formData, {
        fileField: "imageFile",
        urlField: "imageUrl",
        removeField: "removeImage",
        subdir: "blog",
        previousUrl,
    });
    const data = {
        title,
        slug,
        excerpt: String(formData.get("excerpt") ?? "").trim(),
        content: String(formData.get("content") ?? "").trim(),
        imageUrl,
        status,
        publishedAt,
    };
    if (id) {
        await prisma.blogPost.update({ where: { id }, data });
    }
    else {
        await prisma.blogPost.create({ data });
    }
    revalidateLocalized("/blog");
    revalidatePath("/admin/blog");
}
export async function deleteBlogPost(id: string) {
    await requireAdmin();
    const prev = await prisma.blogPost.findUnique({ where: { id }, select: { imageUrl: true } });
    await removeLocalUploadFile(prev?.imageUrl);
    await prisma.blogPost.delete({ where: { id } });
    revalidateLocalized("/blog");
    revalidatePath("/admin/blog");
}
export async function updateAppointmentStatus(id: string, status: string) {
    await requireAdmin();
    await prisma.appointment.update({ where: { id }, data: { status } });
    revalidatePath("/admin/appointments");
}
export async function setAppointmentStatusForm(formData: FormData) {
    await requireAdmin();
    const id = String(formData.get("id") ?? "");
    const status = String(formData.get("status") ?? "NEW");
    await prisma.appointment.update({ where: { id }, data: { status } });
    revalidatePath("/admin/appointments");
}
export async function updateContactStatus(id: string, status: string) {
    await requireAdmin();
    await prisma.contactMessage.update({ where: { id }, data: { status } });
    revalidatePath("/admin/messages");
}
export async function setContactStatusForm(formData: FormData) {
    await requireAdmin();
    const id = String(formData.get("id") ?? "");
    const status = String(formData.get("status") ?? "NEW");
    await prisma.contactMessage.update({ where: { id }, data: { status } });
    revalidatePath("/admin/messages");
}
