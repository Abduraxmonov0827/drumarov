import Image from "next/image";
import { ArrowRight, CalendarCheck, Sparkles } from "lucide-react";
import { DoctorPortraitFrame } from "@/components/doctor-portrait";
import { LocalizedLink } from "@/components/localized-link";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
import { findUmarovDoctor, getPublicGalleryImages, pickHeroUmarovPortraitSrc, pickPortraitSrc, } from "@/lib/local-images";
import { site } from "@/lib/site";
export default async function HomePage({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    const dict = getDictionary(locale);
    const h = dict.pages.home;
    const [doctors, services, departments, galleryImages] = await Promise.all([
        prisma.doctor.findMany({
            orderBy: { sortOrder: "asc" },
            take: 8,
            include: { department: true },
        }),
        prisma.service.findMany({ orderBy: { sortOrder: "asc" }, take: 9 }),
        prisma.department.findMany({ orderBy: { sortOrder: "asc" }, take: 4 }),
        Promise.resolve(getPublicGalleryImages()),
    ]);
    const heroUmarovDoc = findUmarovDoctor(doctors);
    const heroPortraitSrc = pickHeroUmarovPortraitSrc(doctors, galleryImages);
    return (<div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="medfit-blur-halo absolute -left-40 top-10 h-[380px] w-[380px] rounded-full bg-brand/18"/>
        <div className="medfit-blur-halo absolute -right-24 top-32 h-[340px] w-[340px] rounded-full bg-brand-accent/14"/>
        <div className="medfit-blur-halo absolute bottom-[-5%] left-1/3 h-[260px] w-[480px] -translate-x-1/2 rounded-full bg-brand-muted/28"/>
      </div>

      <section className="relative border-b border-brand/8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
          <div data-aos="fade-right" className="relative order-2 rounded-3xl medfit-card p-6 shadow-xl shadow-brand/[0.08] sm:p-8 md:p-10 lg:order-1">
            <div className="medfit-chip mb-4 inline-flex items-center gap-2 rounded-full border border-brand/14 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden/>
              {h.heroBadge}
            </div>
            <p className="text-sm font-medium text-brand">{site.name}</p>
            <h1 className="mt-3 text-[1.65rem] font-bold leading-snug tracking-tight text-brand sm:text-3xl md:text-4xl lg:text-[2.35rem] lg:leading-tight">
              {h.tagline}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-ink sm:text-lg">
              {h.heroLead}
            </p>
            <div className="medfit-chip mt-6 flex justify-center rounded-2xl border border-brand/10 px-4 py-3 shadow-sm lg:justify-start" data-aos="fade-up" data-aos-delay="50">
              <Image src="/brand/bukva-xonasi-akril.svg" alt={h.heroSvgAlt} width={520} height={180} priority className="h-10 w-auto max-w-full object-contain object-center drop-shadow-[0_2px_16px_rgba(0,32,91,0.12)] sm:h-11 md:h-12 md:object-left"/>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <LocalizedLink href="/qabul" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:opacity-95 active:opacity-90">
                <CalendarCheck className="h-4 w-4 shrink-0"/>
                {h.book}
              </LocalizedLink>
              <LocalizedLink href="/xizmatlar" className="medfit-chip inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand/18 px-6 py-3 text-sm font-semibold text-brand shadow-sm transition hover:border-brand/32 hover:bg-white/95">
                {dict.nav.services}
                <ArrowRight className="h-4 w-4"/>
              </LocalizedLink>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="100" className="relative order-1 min-w-0 lg:order-2 lg:min-h-[420px]">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand/12 via-transparent to-brand-accent/10 blur-3xl" aria-hidden/>
            {heroPortraitSrc ? (<div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
                <DoctorPortraitFrame src={heroPortraitSrc} alt={heroUmarovDoc?.name ?? "Dr. Umarov"} nameLine={heroUmarovDoc?.name ?? "Dr. Umarov"} subtitle={heroUmarovDoc?.specialty ?? h.heroSpecialtyFallback} priority aspectClass="aspect-[3/4] min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]" sizes="(max-width: 1024px) min(100vw, 28rem), min(420px, 42vw)" className="shadow-[0_26px_55px_-14px_rgba(27,51,92,0.35)]"/>
              </div>) : (<div className="medfit-card flex min-h-[280px] flex-col items-center justify-center rounded-[2rem] border-dashed border-brand/30 p-6 text-center shadow-inner shadow-brand/5 sm:min-h-[320px] sm:p-8">
                <p className="max-w-sm text-sm text-brand-muted">
                  {h.portraitPlaceholder}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="relative mb-10 sm:mb-12" data-aos="fade-up">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-brand/[0.04] via-transparent to-brand-accent/[0.05]"/>
          <div className="relative rounded-2xl medfit-card p-6 shadow-md shadow-brand/[0.06] sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
              {h.directionsTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-muted">
              {h.directionsSub}
            </p>
            <h3 className="mt-6 border-t border-brand/10 pt-6 text-lg font-semibold text-brand sm:text-xl">
              {h.directionsHijoma}
            </h3>
          </div>
          <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-brand/10 pt-6">
            <LocalizedLink href="/bolimlar" className="text-sm font-semibold text-brand underline-offset-4 hover:underline">
              {h.allDepartments}
            </LocalizedLink>
            <LocalizedLink href="/xizmatlar" className="text-sm font-semibold text-brand underline-offset-4 hover:underline">
              {h.allServices}
            </LocalizedLink>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((d, idx) => (<LocalizedLink key={d.id} href={`/bolimlar/${d.slug}`} data-aos="fade-up" data-aos-delay={String(Math.min(idx * 70, 210))} className="group rounded-2xl medfit-card p-5 shadow-md shadow-brand/[0.05] transition hover:border-brand/22 hover:shadow-lg hover:[box-shadow:0_16px_44px_rgba(0,32,91,0.085)]">
              <p className="font-semibold text-brand group-hover:underline">
                {d.name}
              </p>
              <p className="mt-2 line-clamp-2 text-sm text-brand-muted">
                {d.shortDescription}
              </p>
            </LocalizedLink>))}
        </div>

        <div className="medfit-home-services mt-14 rounded-[2rem] border px-4 py-10 sm:px-6 sm:py-12" data-aos="fade-up">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, idx) => (<li key={s.id} data-aos="zoom-in" data-aos-delay={String(Math.min(idx * 50, 200))} className="medfit-home-services-item rounded-xl border px-4 py-3 text-sm font-medium shadow-sm transition">
                {s.name}
              </li>))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between" data-aos="fade-up">
          <div>
            <h2 className="text-xl font-semibold text-brand sm:text-2xl">
              {h.doctorsTitle}
            </h2>
            <p className="mt-1 max-w-lg text-sm leading-relaxed text-brand-ink">
              {h.doctorsIntro}
            </p>
          </div>
          <LocalizedLink href="/shifokorlar" className="text-sm font-medium text-brand hover:underline">
            {h.doctorsAll}
          </LocalizedLink>
        </div>

        {galleryImages.length > 0 && (<div className="mx-auto mt-10 grid grid-cols-2 justify-items-center gap-4 sm:flex sm:max-w-4xl sm:flex-wrap sm:justify-center sm:gap-8 md:gap-10" data-aos="fade-up" data-aos-delay="60">
            {galleryImages.map((src, idx) => (<div key={src} className="group w-full max-w-[11rem] rounded-[1.75rem] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:w-[13rem] sm:max-w-none sm:shrink-0 hover:-translate-y-2 hover:shadow-[0_22px_48px_-14px_rgba(15,23,42,0.28)] motion-reduce:hover:translate-y-0" data-aos="fade-up" data-aos-delay={String(Math.min(idx * 90, 360))}>
                <DoctorPortraitFrame enableHoverZoom src={pickPortraitSrc(doctors[idx] ?? {}, galleryImages, idx) ??
                    src} alt={doctors[idx]?.name ?? `MedFit ${idx + 1}`} nameLine={doctors[idx]?.name ?? `MedFit jamoasi`} subtitle={doctors[idx]?.specialty ?? h.specialistShort} sizes="208px" aspectClass="aspect-[3/4]" className="shadow-[0_24px_52px_-14px_rgba(15,23,42,0.4)]"/>
              </div>))}
          </div>)}

        <div className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          {doctors.map((doc, idx) => {
            const src = pickPortraitSrc(doc, galleryImages, idx);
            return (<LocalizedLink key={doc.id} href={`/shifokorlar/${doc.slug}`} data-aos="fade-up" data-aos-delay={String(Math.min(idx * 70, 280))} className="group block overflow-hidden rounded-[1.75rem] border border-brand/12 medfit-card shadow-[0_14px_40px_-14px_rgba(27,51,92,0.12)] outline-none transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none hover:-translate-y-2 hover:border-brand/22 hover:shadow-[0_22px_48px_-12px_rgba(27,51,92,0.2)] motion-reduce:hover:translate-y-0 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white max-md:active:scale-[0.99]">
                <DoctorPortraitFrame variant="card" src={src} alt={doc.name} nameLine={doc.name} subtitle={doc.specialty} aspectClass="aspect-[3/4]" sizes="(max-width: 640px) 100vw, 260px"/>
                <p className="border-t border-brand/10 bg-gradient-to-b from-white/90 to-[rgba(245,247,252,0.92)] px-3 py-3 text-center text-xs leading-relaxed text-brand-ink">
                  {doc.bio}
                </p>
              </LocalizedLink>);
        })}
        </div>
      </section>
    </div>);
}
