import Link from "next/link";
import { redirect } from "next/navigation";
import { adminLogout } from "@/app/actions/admin-auth";
import { getAdminSession } from "@/lib/session";
const links = [
    { href: "/admin", label: "Boshqaruv" },
    { href: "/admin/doctors", label: "Shifokorlar" },
    { href: "/admin/services", label: "Xizmatlar" },
    { href: "/admin/departments", label: "Bo‘limlar" },
    { href: "/admin/blog", label: "Blog" },
    { href: "/admin/appointments", label: "Qabul so‘rovlari" },
    { href: "/admin/messages", label: "Aloqa xabarlari" },
];
export default async function AdminDashboardLayout({ children, }: {
    children: React.ReactNode;
}) {
    const session = await getAdminSession();
    if (!session) {
        redirect("/admin/login");
    }
    return (<div className="flex min-h-screen">
      <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white md:block">
        <div className="border-b border-slate-200 px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Admin</p>
          <p className="truncate text-sm font-medium text-slate-900">{session.email}</p>
        </div>
        <nav className="flex flex-col gap-0.5 p-2">
          {links.map((l) => (<Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-brand-surface hover:text-brand">
              {l.label}
            </Link>))}
        </nav>
        <div className="p-2">
          <form action={adminLogout}>
            <button type="submit" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50">
              Chiqish
            </button>
          </form>
        </div>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <span className="text-sm font-medium">Admin</span>
          <form action={adminLogout}>
            <button type="submit" className="text-sm text-brand">
              Chiqish
            </button>
          </form>
        </header>
        <nav className="flex flex-wrap gap-1 border-b border-slate-200 bg-white px-2 py-2 md:hidden">
          {links.map((l) => (<Link key={l.href} href={l.href} className="rounded-md px-2 py-1 text-xs text-slate-700 hover:bg-brand-surface">
              {l.label}
            </Link>))}
        </nav>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>);
}
