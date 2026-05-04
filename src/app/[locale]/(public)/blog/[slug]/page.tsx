import Image from "next/image";
import { LocalizedLink } from "@/components/localized-link";
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
    const post = await prisma.blogPost.findFirst({
        where: { slug, status: "PUBLISHED" },
    });
    return { title: post?.title ?? dict.pages.blog.title };
}
export default async function BlogDetailPage({ params, }: {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}) {
    const { locale, slug } = await params;
    const dict = getDictionary(locale);
    const dateLocale = "uz-UZ";
    const post = await prisma.blogPost.findFirst({
        where: { slug, status: "PUBLISHED" },
    });
    if (!post)
        notFound();
    return (<article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <LocalizedLink href="/blog" className="text-sm text-brand hover:underline">
        {dict.pages.blogPost.back}
      </LocalizedLink>
      <header className="mt-4">
        <time className="text-sm text-brand-muted" dateTime={post.publishedAt?.toISOString()}>
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(dateLocale) : ""}
        </time>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg text-brand-muted">{post.excerpt}</p>
      </header>
      {post.imageUrl ? (<div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-xl border border-brand/10 bg-brand-surface">
          <Image src={post.imageUrl} alt={post.title} fill className="object-cover" priority/>
        </div>) : null}
      <p className="mt-8 whitespace-pre-wrap text-brand-ink leading-relaxed">{post.content}</p>
    </article>);
}
