import { LocalizedLink } from "@/components/localized-link";
import { DoctorPortraitFrame } from "@/components/doctor-portrait";
import { getDictionary } from "@/lib/dictionaries";
import { getPublicGalleryImages } from "@/lib/local-images";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
export async function generateMetadata({ params, }: {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}) {
    const { locale, slug } = await params;
    const dict = getDictionary(locale);
    const d = await prisma.doctor.findUnique({ where: { slug } });
    return { title: d?.name ?? dict.pages.doctorDetail.fallbackTitle };
}
export default async function DoctorDetailPage({ params, }: {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}) {
    const { locale, slug } = await params;
    const dict = getDictionary(locale);
    const p = dict.pages.doctorDetail;
    const py = dict.pages.doctors.years;
    const [doc, galleryImages] = await Promise.all([
        prisma.doctor.findUnique({
            where: { slug },
            include: { department: true },
        }),
        Promise.resolve(getPublicGalleryImages()),
    ]);
    if (!doc)
        notFound();
    const localMatch = galleryImages.find((img) => img.toLowerCase().includes("umarov")) ??
        galleryImages[0] ??
        null;
    const src = doc.imageUrl ?? localMatch;
    return (<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <LocalizedLink href="/shifokorlar" className="text-sm text-brand hover:underline">
        {p.back}
      </LocalizedLink>
      <div className="mt-6 flex flex-col gap-10 sm:flex-row sm:items-start">
        <div className="mx-auto w-full max-w-[20rem] shrink-0 sm:mx-0" data-aos="fade-up">
          <DoctorPortraitFrame src={src} alt={doc.name} nameLine={doc.name} subtitle={doc.specialty} aspectClass="aspect-[3/4]" sizes="320px" className="shadow-[0_26px_55px_-14px_rgba(15,23,42,0.4)]"/>
        </div>
        <div className="min-w-0 flex-1" data-aos="fade-up" data-aos-delay="80">
          {doc.department ? (<p className="text-sm text-brand-muted">
              {p.department}: {doc.department.name}
            </p>) : null}
          {doc.experienceYears ? (<p className="mt-2 text-sm text-brand-muted">
              {p.experience}: {doc.experienceYears} {py}
            </p>) : null}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {doc.email ? (<a href={`mailto:${doc.email}`} className="text-brand hover:underline">
                {doc.email}
              </a>) : null}
            {doc.phone ? (<a href={`tel:${doc.phone}`} className="text-brand hover:underline">
                {doc.phone}
              </a>) : null}
          </div>
          <p className="mt-6 text-brand-ink leading-relaxed">{doc.bio}</p>
          <h2 className="mt-8 text-lg font-semibold text-brand">{p.moreTitle}</h2>
          <p className="mt-2 whitespace-pre-wrap text-brand-ink leading-relaxed">{doc.bioDetailed}</p>
          <h2 className="mt-8 text-lg font-semibold text-brand">{p.treatmentTitle}</h2>
          <p className="mt-2 whitespace-pre-wrap text-brand-ink">{doc.treatmentAreas}</p>
          <LocalizedLink href="/qabul" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-brand to-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:brightness-110 active:brightness-95">
            {p.book}
          </LocalizedLink>
        </div>
      </div>
    </div>);
}
