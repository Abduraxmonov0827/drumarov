import { LocalizedLink } from "@/components/localized-link";
import { MedfitLogo } from "@/components/medfit-logo";
import { SiteMobileNav } from "@/components/site-mobile-nav";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { mainNavPaths } from "@/lib/nav-links";
export function SiteHeader({ locale, dictionary, }: {
    locale: Locale;
    dictionary: Dictionary;
}) {
    const nav = mainNavPaths.map((item) => ({
        href: item.href,
        label: dictionary.nav[item.key],
    }));
    return (<header className="medfit-glass-header sticky top-0 z-50 shadow-sm shadow-brand/8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <MedfitLogo className="min-w-0 flex-1 sm:flex-none" locale={locale} subtitle={dictionary.logo.subtitle} homeAria={dictionary.logo.homeAria}/>
        <nav className="hidden items-center gap-x-1 xl:flex">
          {nav.map((item) => (<LocalizedLink key={item.href} href={item.href} className="rounded-lg px-2 py-2 text-sm font-medium text-brand backdrop-blur-sm transition hover:bg-white/70 hover:text-brand xl:px-2.5">
              {item.label}
            </LocalizedLink>))}
          <LocalizedLink href="/qabul" className="ml-2 shrink-0 rounded-full bg-gradient-to-r from-brand to-brand-accent px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/22 ring-1 ring-white/40 transition hover:opacity-95 active:opacity-90">
            {dictionary.nav.book}
          </LocalizedLink>
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <SiteMobileNav nav={nav} dictionary={dictionary}/>
        </div>
      </div>
    </header>);
}
