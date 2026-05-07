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
    return (<footer className="mt-auto px-4 pb-5 pt-8 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#7fb7db40] bg-gradient-to-br from-[#072247e6] via-[#0a3264d1] to-[#0a2854de] shadow-[0_20px_60px_rgba(1,11,29,0.45)] backdrop-blur-xl">
        <div className="grid gap-8 px-6 py-8 md:grid-cols-2 xl:grid-cols-4">
          <div data-aos="fade-up">
            <MedfitLogo locale={locale} subtitle={dictionary.logo.subtitle} homeAria={dictionary.logo.homeAria}/>
            <p className="mt-3 max-w-xs text-sm text-sky-100/85">{dictionary.pages.home.tagline}</p>
          </div>
          <div className="text-sm text-sky-100/90" data-aos="fade-up" data-aos-delay="80">
            <p className="font-semibold text-white">{dictionary.footer.quick}</p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <LocalizedLink href="/xizmatlar" className="transition hover:text-white">
                  {dictionary.nav.services}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/shifokorlar" className="transition hover:text-white">
                  {dictionary.nav.doctors}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/qabul" className="transition hover:text-white">
                  {dictionary.nav.book}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/aloqa" className="transition hover:text-white">
                  {dictionary.nav.contact}
                </LocalizedLink>
              </li>
            </ul>
          </div>
          <div className="text-sm text-sky-100/90" data-aos="fade-up" data-aos-delay="140">
            <p className="font-semibold text-white">{dictionary.footer.contact}</p>
            <p className="mt-2">{site.phone}</p>
            <p>{site.email}</p>
            <p className="mt-1 max-w-xs">{site.address}</p>
            <SiteSocialLinks dictionary={dictionary} showHeading className="mt-5 border-t border-white/15 pt-4"/>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-sky-100" data-aos="fade-up" data-aos-delay="180">
            <p className="font-semibold text-white">Klinika joylashuvi</p>
            <div className="mt-3 overflow-hidden rounded-xl border border-white/20 bg-slate-950/30">
              <iframe
                src="https://yandex.uz/map-widget/v1/?ll=69.234039%2C41.285828&mode=search&sll=69.233917%2C41.285861&text=41.285861%2C69.233917&z=17"
                width="100%"
                height="220"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Klinika manzili xaritada"
                className="w-full"
              />
            </div>
            <div className="mt-2 space-y-1 text-xs text-sky-100/80">
              <a
                href="https://yandex.uz/maps/10335/tashkent/?ll=69.233917%2C41.285861&utm_medium=mapframe&utm_source=maps&z=17"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                Toshkent
              </a>
              <a
                href="https://yandex.uz/maps/10335/tashkent/?ll=69.234039%2C41.285828&mode=search&sll=69.233917%2C41.285861&text=41.285861%2C69.233917&utm_medium=mapframe&utm_source=maps&z=17"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                Toshkent shahri, Muqimiy ko‘chasi, 98A — Yandex Xarita
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-sky-100/80">
          © {new Date().getFullYear()} {site.shortName}. {dictionary.footer.rights}
        </div>
      </div>
    </footer>);
}
