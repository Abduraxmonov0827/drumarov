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
    return (<header className="sticky top-0 z-50 border-b border-white/10 bg-[#051a34d1] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <MedfitLogo className="min-w-0 flex-1 sm:flex-none" locale={locale} subtitle={dictionary.logo.subtitle} homeAria={dictionary.logo.homeAria}/>
        <nav className="hidden items-center gap-x-1 rounded-full border border-white/15 bg-white/5 p-1.5 xl:flex">
          {nav.map((item) => (<LocalizedLink key={item.href} href={item.href} className="rounded-lg px-2 py-2 text-sm font-medium text-sky-100 backdrop-blur-sm transition hover:bg-white/15 hover:text-white xl:px-2.5">
              {item.label}
            </LocalizedLink>))}
          <LocalizedLink href="/qabul" className="ml-2 shrink-0 rounded-full bg-gradient-to-r from-cyan-100 to-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-md shadow-cyan-300/20 ring-1 ring-white/40 transition hover:opacity-95 active:opacity-90">
            {dictionary.nav.book}
          </LocalizedLink>
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <SiteMobileNav nav={nav} dictionary={dictionary}/>
        </div>
      </div>
    </header>);
}
