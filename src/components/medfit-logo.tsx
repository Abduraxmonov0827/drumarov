import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";
export function MedfitLogo({ className, locale, subtitle, homeAria, }: {
    className?: string;
    locale: Locale;
    subtitle: string;
    homeAria: string;
}) {
    void subtitle;
    return (<Link href={localizedPath(locale, "/")} aria-label={homeAria} className={`medfit-logo-link group relative inline-flex max-w-[min(100%,13rem)] shrink-0 items-center rounded-2xl outline-none transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-surface-warm)] active:translate-y-0 sm:max-w-none ${className ?? ""}`}>
      <span className="medfit-logo-chip relative inline-flex items-center justify-center overflow-hidden rounded-[1.05rem] px-2.5 py-1.5 sm:rounded-[1.15rem] sm:px-3 sm:py-2">
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/35 via-transparent to-brand-accent/[0.06]" aria-hidden/>
        <Image src="/brand/medfit-logo.png" alt="" width={1024} height={352} priority className="relative z-[1] h-7 w-auto max-w-[min(100%,11.5rem)] object-contain object-left sm:h-8 md:h-9" sizes="(max-width: 640px) 140px, 180px"/>
      </span>
    </Link>);
}
