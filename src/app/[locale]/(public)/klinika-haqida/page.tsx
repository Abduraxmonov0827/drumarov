import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
export async function generateMetadata({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    return { title: getDictionary(locale).pages.about.title };
}
export default async function AboutPage({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    const dict = getDictionary(locale);
    const p = dict.pages.about;
    return (<div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand/25 blur-[80px]"/>
        <div className="absolute bottom-20 left-0 h-56 w-56 rounded-full bg-brand-accent/20 blur-[70px]"/>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div data-aos="fade-up" className="medfit-card rounded-3xl border border-white/70 p-8 shadow-xl shadow-brand/15 ring-1 ring-brand/10 backdrop-blur-xl sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">{site.shortName}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand sm:text-4xl">{p.title}</h1>
          <p className="mt-6 text-brand-ink leading-relaxed">{p.p1.replace("{name}", site.name)}</p>
          <h2 className="mt-10 text-xl font-semibold text-brand">{p.mission}</h2>
          <p className="mt-3 text-brand-ink leading-relaxed">{p.missionP}</p>
          <h2 className="mt-10 text-xl font-semibold text-brand">{p.direction}</h2>
          <p className="mt-3 text-brand-ink leading-relaxed">{p.directionP}</p>
          <h2 className="mt-10 text-xl font-semibold text-brand">{p.trust}</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-brand-ink">
            <li>{p.trust1}</li>
            <li>{p.trust2}</li>
            <li>{p.trust3}</li>
          </ul>
        </div>
      </div>
    </div>);
}
