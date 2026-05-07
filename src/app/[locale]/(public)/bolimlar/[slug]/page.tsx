import { LocalizedLink } from "@/components/localized-link";
import { DepartmentIcon } from "@/components/department-icon";
import { getDictionary } from "@/lib/dictionaries";
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
    const d = await prisma.department.findUnique({ where: { slug } });
    return { title: d?.name ?? dict.pages.departmentDetail.fallbackTitle };
}
export default async function DepartmentDetailPage({ params, }: {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}) {
    const { locale, slug } = await params;
    const dict = getDictionary(locale);
    const p = dict.pages.departmentDetail;
    const department = await prisma.department.findUnique({
        where: { slug },
        include: {
            doctors: { orderBy: { sortOrder: "asc" } },
            services: { orderBy: { sortOrder: "asc" } },
        },
    });
    if (!department)
        notFound();
    return (<section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#07274c]/90 via-[#0a3464]/80 to-[#0b2a53]/85 p-6 shadow-[0_20px_55px_rgba(1,10,28,0.45)] sm:p-8">
      <LocalizedLink href="/bolimlar" className="text-sm text-cyan-100/90 hover:text-white hover:underline">
        {p.back}
      </LocalizedLink>
      <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-start">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-cyan-100 backdrop-blur-sm">
          <DepartmentIcon name={department.icon} className="h-8 w-8"/>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{department.name}</h1>
          <p className="mt-2 text-sky-100/85">{department.shortDescription}</p>
        </div>
      </div>
      <p className="mt-8 whitespace-pre-wrap leading-relaxed text-sky-100/90">{department.description}</p>
      {department.services.length > 0 ? (<div className="mt-10 glass-soft rounded-2xl border border-white/20 p-5">
          <h2 className="text-lg font-semibold text-white">{p.servicesHeading}</h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sky-100/90">
            {department.services.map((s) => (<li key={s.id}>{s.name}</li>))}
          </ul>
        </div>) : null}
      {department.doctors.length > 0 ? (<div className="mt-6 glass-soft rounded-2xl border border-white/20 p-5">
          <h2 className="text-lg font-semibold text-white">{p.doctorsHeading}</h2>
          <ul className="mt-3 space-y-2">
            {department.doctors.map((doc) => (<li key={doc.id}>
                <LocalizedLink href={`/shifokorlar/${doc.slug}`} className="text-sky-100 hover:text-white hover:underline">
                  {doc.name} — {doc.specialty}
                </LocalizedLink>
              </li>))}
          </ul>
        </div>) : null}
      </div>
    </section>);
}
