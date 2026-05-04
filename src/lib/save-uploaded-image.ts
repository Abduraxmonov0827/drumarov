import { v2 as cloudinary } from "cloudinary";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
function getCloudinaryConfig() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? "";
    const apiKey = process.env.CLOUDINARY_API_KEY ?? "";
    const apiSecret = process.env.CLOUDINARY_API_SECRET ?? "";
    if (!cloudName || !apiKey || !apiSecret) {
        throw new Error("Cloudinary sozlanmagan: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET ni to‘ldiring.");
    }
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
    });
    return cloudName;
}
function extractCloudinaryPublicId(url: string): string | null {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+(?:\?.*)?$/);
    return match?.[1] ?? null;
}
export function isLocalUploadPath(url: string | null | undefined): boolean {
    if (!url)
        return false;
    if (url.startsWith("/uploads/"))
        return true;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    return !!cloudName && url.includes(`res.cloudinary.com/${cloudName}/`);
}
export async function removeLocalUploadFile(publicUrl: string | null | undefined): Promise<void> {
    if (!publicUrl || !isLocalUploadPath(publicUrl))
        return;
    if (publicUrl.startsWith("/uploads/")) {
        return;
    }
    try {
        getCloudinaryConfig();
        const publicId = extractCloudinaryPublicId(publicUrl);
        if (!publicId)
            return;
        await cloudinary.uploader.destroy(publicId, {
            invalidate: true,
            resource_type: "image",
        });
    }
    catch {
    }
}
export async function saveUploadedImage(file: File, subdir: "doctors" | "blog"): Promise<string> {
    if (!file.size)
        throw new Error("Fayl tanlanmagan.");
    if (file.size > MAX_BYTES)
        throw new Error("Rasm hajmi 5 MB dan oshmasligi kerak.");
    if (!ALLOWED.has(file.type))
        throw new Error("Faqat JPEG, PNG yoki WebP formatlari qabul qilinadi.");
    getCloudinaryConfig();
    const buf = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:${file.type};base64,${buf.toString("base64")}`;
    const uploaded = await cloudinary.uploader.upload(dataUri, {
        folder: `medfit/${subdir}`,
        resource_type: "image",
        use_filename: true,
        unique_filename: true,
        overwrite: false,
    });
    return uploaded.secure_url;
}
