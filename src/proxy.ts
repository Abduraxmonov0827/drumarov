import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

const COOKIE = "clinic_admin";

function looksLikePublicAsset(pathname: string) {
    return /\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|woff2?|webmanifest)$/i.test(pathname);
}

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (pathname.startsWith("/_next") || pathname === "/favicon.ico" || looksLikePublicAsset(pathname)) {
        return NextResponse.next();
    }
    if (pathname.startsWith("/api")) {
        return NextResponse.next();
    }
    const segmentsEarly = pathname.split("/").filter(Boolean);
    if (segmentsEarly.length >= 2 && isLocale(segmentsEarly[0]!) && segmentsEarly[1] === "admin") {
        const tail = segmentsEarly.slice(2);
        const url = req.nextUrl.clone();
        url.pathname = tail.length ? `/admin/${tail.join("/")}` : "/admin";
        return NextResponse.redirect(url);
    }
    if (pathname.startsWith("/admin")) {
        const secret = process.env.ADMIN_JWT_SECRET;
        if (pathname.startsWith("/admin/login")) {
            return NextResponse.next();
        }
        if (!secret || secret.length < 16) {
            return NextResponse.redirect(new URL("/admin/login?err=config", req.url));
        }
        const token = req.cookies.get(COOKIE)?.value;
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
        try {
            await jwtVerify(token, new TextEncoder().encode(secret));
            return NextResponse.next();
        }
        catch {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }
    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];
    if (first === "ru") {
        const url = req.nextUrl.clone();
        const tail = segments.slice(1).join("/");
        url.pathname = tail ? `/uz/${tail}` : "/uz";
        return NextResponse.redirect(url);
    }
    if (first && isLocale(first)) {
        return NextResponse.next();
    }
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
