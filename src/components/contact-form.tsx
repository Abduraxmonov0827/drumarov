"use client";
import { useActionState } from "react";
import { submitContact } from "@/app/actions/public-forms";
import type { Dictionary } from "@/lib/dictionaries";
const field = "mt-1 min-h-11 w-full rounded-lg border border-brand/25 bg-white px-3 py-2.5 text-base text-brand-ink outline-none ring-brand/20 transition placeholder:text-brand-muted/55 focus:border-brand/40 focus:ring-2 sm:text-sm";
export function ContactForm({ labels }: {
    labels: Dictionary["forms"]["contact"];
}) {
    const [state, formAction, pending] = useActionState(submitContact, undefined);
    if (state?.ok) {
        return (<div className="rounded-xl border border-brand/12 medfit-card p-6 text-brand-ink">
        <p className="font-semibold text-brand">{labels.okTitle}</p>
        <p className="mt-2 text-sm text-brand-muted">{labels.okHint}</p>
      </div>);
    }
    return (<form action={formAction} className="mx-auto w-full max-w-lg space-y-4">
      {state?.error ? (<p className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{state.error}</p>) : null}
      <div>
        <label className="text-sm font-medium text-brand-muted" htmlFor="cname">
          {labels.name}
        </label>
        <input id="cname" name="name" required className={field}/>
      </div>
      <div>
        <label className="text-sm font-medium text-brand-muted" htmlFor="cemail">
          {labels.email}
        </label>
        <input id="cemail" name="email" type="email" required className={field}/>
      </div>
      <div>
        <label className="text-sm font-medium text-brand-muted" htmlFor="cphone">
          {labels.phone}
        </label>
        <input id="cphone" name="phone" type="tel" className={field}/>
      </div>
      <div>
        <label className="text-sm font-medium text-brand-muted" htmlFor="csubject">
          {labels.subject}
        </label>
        <input id="csubject" name="subject" className={field}/>
      </div>
      <div>
        <label className="text-sm font-medium text-brand-muted" htmlFor="cmessage">
          {labels.message}
        </label>
        <textarea id="cmessage" name="message" required rows={4} className="mt-1 min-h-[7rem] w-full rounded-lg border border-brand/25 bg-white px-3 py-2.5 text-base text-brand-ink outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/25 sm:text-sm"/>
      </div>
      <button type="submit" disabled={pending} className="min-h-12 w-full rounded-lg bg-gradient-to-r from-brand to-brand-accent py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:brightness-110 active:brightness-95 disabled:opacity-60">
        {pending ? labels.sending : labels.submit}
      </button>
    </form>);
}
