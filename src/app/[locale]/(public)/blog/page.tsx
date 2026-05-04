import Image from "next/image";
import { LocalizedLink } from "@/components/localized-link";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
export async function generateMetadata({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    return { title: getDictionary(locale).pages.blog.title };
}
export default async function BlogPage({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    const dict = getDictionary(locale);
    const p = dict.pages.blog;
    const posts = await prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
    });
    const dateLocale = "uz-UZ";
    return (<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">{p.heading}</h1>
      <p className="mt-3 max-w-2xl text-brand-muted">{p.intro}</p>
      <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {posts.map((post) => (<article key={post.id} className="medfit-card overflow-hidden rounded-xl border border-brand/15 shadow-md shadow-brand/10 transition hover:border-brand/30">
            <LocalizedLink href={`/blog/${post.slug}`}>
              <div className="relative aspect-[16/10] bg-brand-surface">
                {post.imageUrl ? (<Image src={post.imageUrl} alt={post.title} fill className="object-cover"/>) : null}
              </div>
              <div className="p-5">
                <time className="text-xs text-brand-muted" dateTime={post.publishedAt?.toISOString()}>
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(dateLocale) : ""}
                </time>
                <h2 className="mt-2 font-semibold text-brand">{post.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-brand-muted">{post.excerpt}</p>
              </div>
            </LocalizedLink>
          </article>))}
      </div>
      {posts.length === 0 ? <p className="mt-8 text-sm text-brand-muted">{p.empty}</p> : null}
    </div>);
}
