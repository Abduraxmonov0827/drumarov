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
    return (<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <LocalizedLink href="/bolimlar" className="text-sm text-brand hover:underline">
        {p.back}
      </LocalizedLink>
      <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-start">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-brand/10 bg-white/75 text-brand backdrop-blur-sm">
          <DepartmentIcon name={department.icon} className="h-8 w-8"/>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">{department.name}</h1>
          <p className="mt-2 text-brand-muted">{department.shortDescription}</p>
        </div>
      </div>
      <p className="mt-8 whitespace-pre-wrap text-brand-ink leading-relaxed">{department.description}</p>
      {department.services.length > 0 ? (<div className="mt-10">
          <h2 className="text-lg font-semibold text-brand">{p.servicesHeading}</h2>
          <ul className="mt-3 list-inside list-disc text-brand-ink">
            {department.services.map((s) => (<li key={s.id}>{s.name}</li>))}
          </ul>
        </div>) : null}
      {department.doctors.length > 0 ? (<div className="mt-10">
          <h2 className="text-lg font-semibold text-brand">{p.doctorsHeading}</h2>
          <ul className="mt-3 space-y-2">
            {department.doctors.map((doc) => (<li key={doc.id}>
                <LocalizedLink href={`/shifokorlar/${doc.slug}`} className="text-brand hover:underline">
                  {doc.name} — {doc.specialty}
                </LocalizedLink>
              </li>))}
          </ul>
        </div>) : null}
    </div>);
}
