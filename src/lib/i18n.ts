export const locales = ["uz"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";
export function isLocale(s: string): s is Locale {
    return locales.includes(s as Locale);
}
export function localizedPath(locale: Locale, path: string): string {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    if (normalized === "/")
        return `/${locale}`;
    return `/${locale}${normalized}`;
}
