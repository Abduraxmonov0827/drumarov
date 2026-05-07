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
    return (<section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#07274c]/90 via-[#0a3464]/80 to-[#0b2a53]/85 p-6 shadow-[0_20px_55px_rgba(1,10,28,0.45)] sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{p.title}</h1>
        <p className="mt-3 max-w-2xl text-sky-100/85">{p.intro}</p>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map((s) => (<article key={s.id} className="glass-soft rounded-2xl border border-white/20 p-5 transition hover:-translate-y-1 hover:border-cyan-200/40 sm:p-6">
              <h2 className="text-xl font-semibold text-white">{s.name}</h2>
              {s.department ? (<p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">{s.department.name}</p>) : null}
              <p className="mt-3 text-sm leading-7 text-sky-100/85">{s.description}</p>
            </article>))}
        </div>
      </div>
    </section>);
}
