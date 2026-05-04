import { LocalizedLink } from "@/components/localized-link";
import { DoctorPortraitFrame } from "@/components/doctor-portrait";
import { getDictionary } from "@/lib/dictionaries";
import { getPublicGalleryImages, pickPortraitSrc } from "@/lib/local-images";
import { prisma } from "@/lib/prisma";
export async function generateMetadata({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    return { title: getDictionary(locale).pages.doctors.title };
}
export default async function DoctorsPage({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    const dict = getDictionary(locale);
    const p = dict.pages.doctors;
    const [doctors, galleryImages] = await Promise.all([
        prisma.doctor.findMany({
            orderBy: { sortOrder: "asc" },
            include: { department: true },
        }),
        Promise.resolve(getPublicGalleryImages()),
    ]);
    return (<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">{p.title}</h1>
      <p className="mt-3 max-w-2xl text-brand-muted">{p.intro}</p>
      <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
        {doctors.map((doc, idx) => {
            const src = pickPortraitSrc(doc, galleryImages, idx);
            return (<article key={doc.id} data-aos="fade-up" data-aos-delay={String(Math.min(idx * 80, 240))} className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-brand/12 medfit-card shadow-[0_14px_40px_-14px_rgba(27,51,92,0.12)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none hover:-translate-y-2 hover:border-brand/22 hover:shadow-[0_22px_48px_-12px_rgba(27,51,92,0.2)] motion-reduce:hover:translate-y-0 max-md:active:scale-[0.99] max-md:active:transition-transform">
              <LocalizedLink href={`/shifokorlar/${doc.slug}`} className="block outline-none transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                <DoctorPortraitFrame variant="card" src={src} alt={doc.name} nameLine={doc.name} subtitle={doc.specialty} aspectClass="aspect-[4/5] sm:aspect-[3/4]" sizes="(max-width: 1024px) 100vw, 340px"/>
              </LocalizedLink>
              <div className="border-t border-brand/10 bg-gradient-to-b from-white/90 to-[rgba(245,247,252,0.92)] px-5 pb-5 pt-4">
                {doc.department ? (<p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                    {doc.department.name}
                  </p>) : null}
                <p className="mt-2 line-clamp-3 text-sm text-brand-muted">{doc.bio}</p>
                {doc.experienceYears ? (<p className="mt-3 text-xs text-brand-muted">
                    {p.experience}: {doc.experienceYears} {p.years}
                  </p>) : null}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <LocalizedLink href={`/shifokorlar/${doc.slug}`} className="font-semibold text-brand hover:underline">
                    {p.detail}
                  </LocalizedLink>
                  {doc.phone ? (<a href={`tel:${doc.phone}`} className="text-brand-muted hover:text-brand">
                      {doc.phone}
                    </a>) : null}
                </div>
              </div>
            </article>);
        })}
      </div>
    </div>);
}
