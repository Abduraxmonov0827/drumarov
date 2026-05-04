import { Camera, Megaphone, Send } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
const linkClass = "inline-flex items-center gap-2 rounded-full border border-brand/14 bg-white/90 px-3 py-2 text-sm font-medium text-brand-ink shadow-sm shadow-brand/5 backdrop-blur-md transition hover:border-brand/28 hover:bg-white hover:text-brand hover:shadow-brand/10";
type Props = {
    dictionary: Dictionary;
    showHeading?: boolean;
    className?: string;
};
export function SiteSocialLinks({ dictionary, showHeading = false, className }: Props) {
    const s = dictionary.social;
    return (<div className={className}>
      {showHeading ? (<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
          {s.heading}
        </p>) : null}
      <div className="flex flex-wrap gap-2.5">
        <a href={site.social.telegram} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Megaphone className="h-4 w-4 shrink-0" aria-hidden/>
          {s.telegramChannel}
        </a>
        <a href={site.social.telegramAdmin} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Send className="h-4 w-4 shrink-0" aria-hidden/>
          {s.telegramAdmin}
        </a>
        <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Camera className="h-4 w-4 shrink-0" aria-hidden/>
          {s.instagram}
        </a>
      </div>
    </div>);
}
