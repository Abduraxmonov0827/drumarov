import Link from "next/link";
import { prisma } from "@/lib/prisma";
export default async function AdminHomePage() {
    const [doctors, services, departments, posts, appointments, messages] = await Promise.all([
        prisma.doctor.count(),
        prisma.service.count(),
        prisma.department.count(),
        prisma.blogPost.count(),
        prisma.appointment.count({ where: { status: "NEW" } }),
        prisma.contactMessage.count({ where: { status: "NEW" } }),
    ]);
    const cards = [
        { label: "Shifokorlar", value: doctors, href: "/admin/doctors" },
        { label: "Xizmatlar", value: services, href: "/admin/services" },
        { label: "Bo‘limlar", value: departments, href: "/admin/departments" },
        { label: "Blog yozuvlari", value: posts, href: "/admin/blog" },
        {
            label: "Yangi qabul so‘rovlari",
            value: appointments,
            href: "/admin/appointments",
        },
        { label: "Yangi xabarlar", value: messages, href: "/admin/messages" },
    ];
    return (<div>
      <h1 className="text-2xl font-semibold text-slate-900">Boshqaruv paneli</h1>
      <p className="mt-1 text-sm text-slate-600">
        Klinika kontenti va mijoz so‘rovlarini shu yerdan boshqarasiz.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (<Link key={c.href} href={c.href} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand/25 hover:shadow">
            <p className="text-sm text-slate-600">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold text-brand">{c.value}</p>
          </Link>))}
      </div>
    </div>);
}
