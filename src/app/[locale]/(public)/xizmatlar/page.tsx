import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
export async function generateMetadata({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    return { title: getDictionary(locale).pages.services.title };
}
export default async function ServicesPage({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    const dict = getDictionary(locale);
    const p = dict.pages.services;
    const services = await prisma.service.findMany({
        orderBy: { sortOrder: "asc" },
        include: { department: true },
    });
    return (<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">{p.title}</h1>
      <p className="mt-3 max-w-2xl text-brand-muted">{p.intro}</p>
      <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {services.map((s) => (<article key={s.id} className="medfit-card rounded-xl border border-brand/15 p-5 shadow-md shadow-brand/10 sm:p-6">
            <h2 className="text-lg font-semibold text-brand">{s.name}</h2>
            {s.department ? (<p className="mt-1 text-xs font-medium uppercase text-brand">{s.department.name}</p>) : null}
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">{s.description}</p>
          </article>))}
      </div>
    </div>);
}
