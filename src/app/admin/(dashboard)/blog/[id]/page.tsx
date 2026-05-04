import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogForm } from "../blog-form";
import { prisma } from "@/lib/prisma";
export default async function EditBlogPage({ params, }: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post)
        notFound();
    return (<div>
      <Link href="/admin/blog" className="text-sm text-brand hover:underline">
        ← Ro‘yxat
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Maqolani tahrirlash</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <BlogForm post={post}/>
      </div>
    </div>);
}
