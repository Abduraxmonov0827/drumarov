import fs from "node:fs";
import path from "node:path";
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;
function priorityScore(filename: string) {
    const n = filename.toLowerCase();
    if (n.includes("umarov") || n.includes("drumarov") || n.includes("dr-umarov")) {
        return 0;
    }
    if (n.includes("doctor") || n.includes("doktor") || n.includes("lead")) {
        return 1;
    }
    return 2;
}
export function pickPortraitSrc(opts: {
    imageUrl?: string | null;
    slug?: string | null;
}, galleryImages: string[], fallbackIndex: number): string | null {
    if (opts.imageUrl)
        return opts.imageUrl;
    if (galleryImages.length === 0)
        return null;
    const slug = (opts.slug ?? "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "");
    if (slug.length >= 4) {
        const hit = galleryImages.find((url) => {
            const file = url
                .split("/")
                .pop()
                ?.replace(/\.[^.]+$/i, "")
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, "") ?? "";
            if (file.length < 3)
                return false;
            if (file.includes(slug))
                return true;
            if (file.length >= 5 && slug.includes(file))
                return true;
            return false;
        });
        if (hit)
            return hit;
    }
    return galleryImages[fallbackIndex % galleryImages.length] ?? null;
}
function isUmarovDoctor(slug?: string | null, name?: string | null) {
    const h = `${slug ?? ""} ${name ?? ""}`.toLowerCase().normalize("NFKD");
    return (h.includes("umarov") ||
        h.includes("umaroff") ||
        h.includes("умаров") ||
        h.includes("o‘marov") ||
        h.includes("o'marov"));
}
export function findUmarovDoctor<T extends {
    slug?: string | null;
    name?: string | null;
}>(doctors: T[]): T | undefined {
    return doctors.find((d) => isUmarovDoctor(d.slug, d.name));
}
export function pickHeroUmarovPortraitSrc(doctors: Array<{
    imageUrl?: string | null;
    slug?: string | null;
    name?: string | null;
}>, galleryImages: string[]): string | null {
    const doc = findUmarovDoctor(doctors);
    if (doc) {
        const picked = pickPortraitSrc(doc, galleryImages, 0);
        if (picked)
            return picked;
    }
    const fileHit = galleryImages.find((url) => priorityScore(url.split("/").pop() ?? "") === 0);
    return fileHit ?? galleryImages[0] ?? null;
}
export function getPublicGalleryImages(): string[] {
    const dir = path.join(process.cwd(), "public", "images");
    try {
        if (!fs.existsSync(dir))
            return [];
        return fs
            .readdirSync(dir)
            .filter((f) => IMAGE_EXT.test(f))
            .sort((a, b) => {
            const pa = priorityScore(a);
            const pb = priorityScore(b);
            if (pa !== pb)
                return pa - pb;
            return a.localeCompare(b, "uz");
        })
            .map((f) => `/images/${f}`);
    }
    catch {
        return [];
    }
}
