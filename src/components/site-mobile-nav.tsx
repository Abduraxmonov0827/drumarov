"use client";
import { Menu, X } from "lucide-react";
import { LocalizedLink } from "@/components/localized-link";
import type { Dictionary } from "@/lib/dictionaries";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
const subscribeNoop = () => () => { };
type NavItem = {
    href: string;
    label: string;
};
export function SiteMobileNav({ nav, dictionary, }: {
    nav: NavItem[];
    dictionary: Dictionary;
}) {
    const [open, setOpen] = useState(false);
    const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);
    const m = dictionary.mobile;
    const overlay = open && mounted ? (<div className="fixed inset-0 z-[100] xl:hidden" id="site-mobile-panel" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-gradient-to-br from-brand/45 via-brand-deep/35 to-brand-accent/30 backdrop-blur-md" aria-label={m.closeOverlay} onClick={() => setOpen(false)}/>
      <div className="medfit-glass-sheet absolute inset-y-0 left-0 right-0 z-[1] flex max-h-[100dvh] w-full flex-col pt-[env(safe-area-inset-top)] sm:left-auto sm:right-0 sm:w-[min(22rem,calc(100vw-1rem))] sm:max-w-none sm:border-l sm:border-brand/12">
        <div className="flex w-full shrink-0 items-center justify-between border-b border-brand/15 py-4 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
          <span className="text-sm font-bold uppercase tracking-wide text-brand">{m.menu}</span>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg text-brand hover:bg-brand/10" onClick={() => setOpen(false)} aria-label={m.close}>
            <X className="h-6 w-6"/>
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain p-3 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))]">
          {nav.map((item) => (<LocalizedLink key={item.href} href={item.href} className="rounded-xl px-4 py-3.5 text-base font-medium text-brand transition hover:bg-brand/10 active:bg-brand/15" onClick={() => setOpen(false)}>
              {item.label}
            </LocalizedLink>))}
        </nav>
        <div className="shrink-0 border-t border-brand/15 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
          <LocalizedLink href="/qabul" className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brand to-brand-accent py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:opacity-95 active:opacity-90" onClick={() => setOpen(false)}>
            {dictionary.nav.book}
          </LocalizedLink>
        </div>
      </div>
    </div>) : null;
    return (<>
      <button type="button" className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-white/90 text-brand shadow-sm backdrop-blur-sm transition hover:bg-brand/5 xl:hidden" aria-expanded={open} aria-controls="site-mobile-panel" onClick={() => setOpen(true)}>
        <Menu className="h-6 w-6" aria-hidden/>
        <span className="sr-only">{m.open}</span>
      </button>

      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>);
}
