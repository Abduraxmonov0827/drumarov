import Link from "next/link";
import { deleteBlogPost } from "@/app/actions/admin-mutations";
import { prisma } from "@/lib/prisma";
export default async function AdminBlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { updatedAt: "desc" },
    });
    return (<div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Blog / yangiliklar</h1>
        <Link href="/admin/blog/new" className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-medium text-white hover:bg-brand-accent/90">
          Yangi maqola
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Sarlavha</th>
              <th className="px-4 py-3 font-medium">Holat</th>
              <th className="px-4 py-3 font-medium">Yangilangan</th>
              <th className="px-4 py-3 font-medium"/>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (<tr key={p.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{p.title}</td>
                <td className="px-4 py-3 text-slate-600">{p.status}</td>
                <td className="px-4 py-3 text-slate-600">
                  {p.updatedAt.toLocaleDateString("uz-UZ")}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/blog/${p.id}`} className="text-brand hover:underline">
                    Tahrirlash
                  </Link>
                  <form action={deleteBlogPost.bind(null, p.id)} className="ml-3 inline">
                    <button type="submit" className="text-red-600 hover:underline">
                      O‘chirish
                    </button>
                  </form>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
}
