import Image from "next/image";
import { saveBlogPost } from "@/app/actions/admin-mutations";
import type { BlogPost } from "@/generated/prisma/client";
import { isLocalUploadPath } from "@/lib/save-uploaded-image";
export function BlogForm({ post }: {
    post?: BlogPost | null;
}) {
    const publishedStr = post?.publishedAt
        ? new Date(post.publishedAt).toISOString().slice(0, 16)
        : "";
    const imageUrlDefault = post?.imageUrl && !isLocalUploadPath(post.imageUrl) ? post.imageUrl : "";
    return (<form action={saveBlogPost} encType="multipart/form-data" className="mx-auto max-w-3xl space-y-4">
      {post ? <input type="hidden" name="id" value={post.id}/> : null}
      <div>
        <label className="text-sm font-medium text-slate-700">Sarlavha</label>
        <input name="title" required defaultValue={post?.title} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">
          Sahifa manzili (slug)
        </label>
        <p className="mt-0.5 text-xs text-slate-500">
          Blog yozuvi URLidagi qisqa nom, masalan{" "}
          <span className="font-mono text-slate-600">/blog/hijoma-haqida</span>.
          Bo‘sh qoldirsangiz, sarlavha asosida avtomatik yaratiladi.
        </p>
        <input name="slug" defaultValue={post?.slug} placeholder="Masalan: hijoma-haqida yoki bo‘sh" className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Qisqa matn</label>
        <textarea name="excerpt" required rows={2} defaultValue={post?.excerpt} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">
          To‘liq matn
        </label>
        <textarea name="content" required rows={12} defaultValue={post?.content} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"/>
      </div>
      <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/80 p-4">
        <label className="text-sm font-medium text-slate-700">Rasm</label>
        <p className="text-xs text-slate-500">
          Yuklash (JPEG, PNG, WebP, maks. 5 MB) yoki tashqi havola.
        </p>
        {post?.imageUrl ? (<div className="relative h-28 w-full max-w-[14rem] overflow-hidden rounded-lg border border-slate-200 shadow-sm">
            <Image src={post.imageUrl} alt="" fill className="object-cover" sizes="224px" unoptimized/>
          </div>) : null}
        <input name="imageFile" type="file" accept="image/jpeg,image/png,image/webp" className="block w-full max-w-md text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:opacity-95"/>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Tashqi havola (ixtiyoriy)
          </label>
          <input name="imageUrl" type="url" placeholder="https://..." defaultValue={imageUrlDefault} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"/>
        </div>
        {post?.imageUrl ? (<label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" name="removeImage" value="1" className="rounded border-slate-300"/>
            <span>Rasmni olib tashlash</span>
          </label>) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">Holat</label>
          <select name="status" defaultValue={post?.status ?? "DRAFT"} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="DRAFT">Qoralama</option>
            <option value="PUBLISHED">Nashr qilingan</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Nashr sanasi (UTC)
          </label>
          <input name="publishedAt" type="datetime-local" defaultValue={publishedStr} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"/>
        </div>
      </div>
      <button type="submit" className="rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-accent/90">
        Saqlash
      </button>
    </form>);
}
