import { AppointmentForm } from "@/components/appointment-form";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
export async function generateMetadata({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    return { title: getDictionary(locale).pages.appointment.title };
}
export default async function AppointmentPage({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    const dict = getDictionary(locale);
    const p = dict.pages.appointment;
    const departments = await prisma.department.findMany({
        orderBy: { sortOrder: "asc" },
        select: { id: true, name: true },
    });
    return (<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">{p.title}</h1>
      <p className="mt-3 text-brand-muted">{p.intro}</p>
      <div className="medfit-card mt-8 rounded-xl border border-brand/15 p-5 shadow-md shadow-brand/10 sm:p-6">
        <AppointmentForm departments={departments} labels={dict.forms.appointment}/>
      </div>
    </div>);
}
