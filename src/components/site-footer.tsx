import { MedfitLogo } from "@/components/medfit-logo";
import { LocalizedLink } from "@/components/localized-link";
import { SiteSocialLinks } from "@/components/site-social-links";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
export function SiteFooter({ locale, dictionary, }: {
    locale: Locale;
    dictionary: Dictionary;
}) {
    return (<footer className="medfit-glass-footer mt-auto border-t border-brand/12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div data-aos="fade-up">
          <MedfitLogo locale={locale} subtitle={dictionary.logo.subtitle} homeAria={dictionary.logo.homeAria}/>
          <p className="mt-3 text-sm text-brand-muted">{dictionary.pages.home.tagline}</p>
        </div>
        <div className="text-sm text-brand-muted" data-aos="fade-up" data-aos-delay="80">
          <p className="font-semibold text-brand">{dictionary.footer.quick}</p>
          <ul className="mt-2 space-y-1">
            <li>
              <LocalizedLink href="/xizmatlar" className="transition hover:text-brand">
                {dictionary.nav.services}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink href="/shifokorlar" className="transition hover:text-brand">
                {dictionary.nav.doctors}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink href="/qabul" className="transition hover:text-brand">
                {dictionary.nav.book}
              </LocalizedLink>
            </li>
          </ul>
        </div>
        <div className="text-sm text-brand-muted" data-aos="fade-up" data-aos-delay="140">
          <p className="font-semibold text-brand">{dictionary.footer.contact}</p>
          <p className="mt-2">{site.phone}</p>
          <p>{site.email}</p>
          <p className="mt-1 max-w-xs">{site.address}</p>
          <SiteSocialLinks dictionary={dictionary} showHeading className="mt-5 border-t border-brand/10 pt-5"/>
        </div>
      </div>
      <div className="border-t border-brand/10 bg-white/58 py-4 text-center text-xs text-brand-muted backdrop-blur-sm">
        © {new Date().getFullYear()} {site.shortName}. {dictionary.footer.rights}
      </div>
    </footer>);
}
