import Link from "next/link";
import { BlogForm } from "../blog-form";
export default function NewBlogPage() {
    return (<div>
      <Link href="/admin/blog" className="text-sm text-brand hover:underline">
        ← Ro‘yxat
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Yangi maqola</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <BlogForm />
      </div>
    </div>);
}
