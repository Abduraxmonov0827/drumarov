import { MapPin, Phone, Send } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SiteSocialLinks } from "@/components/site-social-links";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
export async function generateMetadata({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    return { title: getDictionary(locale).pages.contact.title };
}
export default async function ContactPage({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    const dict = getDictionary(locale);
    const p = dict.pages.contact;
    const mapUrl = process.env.NEXT_PUBLIC_MAPS_EMBED_URL;
    return (<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">{p.title}</h1>
      <p className="mt-3 max-w-2xl text-brand-muted">{p.intro}</p>
      <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand"/>
            <div>
              <p className="font-medium text-brand">{p.phone}</p>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-brand hover:underline">
                {site.phone}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <Send className="mt-0.5 h-5 w-5 shrink-0 text-brand"/>
            <div>
              <p className="font-medium text-brand">{p.email}</p>
              <a href={`mailto:${site.email}`} className="text-brand hover:underline">
                {site.email}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand"/>
            <div>
              <p className="font-medium text-brand">{p.address}</p>
              <p className="text-brand-ink">{site.address}</p>
              <p className="mt-2 text-sm text-brand-muted">{site.hours}</p>
            </div>
          </div>
          <SiteSocialLinks dictionary={dict} showHeading className="pt-2"/>
          <div className="medfit-card rounded-xl border border-brand/15 p-5 shadow-md shadow-brand/10 sm:p-6">
            <h2 className="text-lg font-semibold text-brand">{p.sendMessage}</h2>
            <div className="mt-4">
              <ContactForm labels={dict.forms.contact}/>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-brand">{p.map}</h2>
          {mapUrl ? (<iframe title={p.mapTitle} src={mapUrl} className="mt-4 h-72 min-h-[18rem] w-full rounded-xl border-0 shadow-sm ring-1 ring-brand/15 sm:h-[26rem]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>) : (<div className="mt-4 flex min-h-[18rem] items-center justify-center rounded-xl border border-dashed border-brand/25 bg-white/80 px-4 py-8 text-center text-sm text-brand-muted backdrop-blur-sm sm:h-80">
              {p.mapPlaceholder}
            </div>)}
        </div>
      </div>
    </div>);
}
