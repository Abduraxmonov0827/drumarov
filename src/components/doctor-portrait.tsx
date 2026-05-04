import Image from "next/image";
type PortraitProps = {
    src: string | null;
    alt: string;
    nameLine: string;
    subtitle?: string | null;
    className?: string;
    aspectClass?: string;
    sizes?: string;
    priority?: boolean;
    variant?: "standalone" | "card";
    enableHoverZoom?: boolean;
};
export function DoctorPortraitFrame({ src, alt, nameLine, subtitle, className, aspectClass = "aspect-[3/4]", sizes, priority, variant = "standalone", enableHoverZoom, }: PortraitProps) {
    const isCard = variant === "card";
    const radius = isCard
        ? "rounded-t-[1.75rem] rounded-b-none"
        : "rounded-[1.85rem]";
    const chrome = isCard
        ? "shadow-none ring-0"
        : "shadow-[0_18px_42px_-14px_rgba(27,51,92,0.28)] ring-1 ring-brand/10";
    const zoomActive = isCard || enableHoverZoom;
    const imgMotion = zoomActive
        ? "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
        : "";
    return (<div className={`relative mx-auto w-full max-w-full overflow-hidden bg-neutral-500 ${radius} ${chrome} ${className ?? ""}`}>
      <div className={`relative w-full ${aspectClass}`}>
        {src ? (<Image src={src} alt={alt} fill className={`object-cover object-[center_12%] ${imgMotion}`} sizes={sizes ?? "(max-width: 768px) 100vw, 320px"} priority={priority}/>) : (<div className="flex h-full min-h-[200px] items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-sm text-slate-600">
            Rasm qo‘shilmagan
          </div>)}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.88] via-black/30 to-transparent"/>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start justify-end p-4 pb-[1.15rem] text-left sm:p-5 sm:pb-6">
          <p className="max-w-[95%] text-[1.05rem] font-bold leading-snug tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)] sm:text-xl">
            {nameLine}
          </p>
          {subtitle ? (<p className="mt-2 max-w-[95%] text-xs font-semibold uppercase tracking-[0.12em] text-white/88 sm:text-[0.8rem]">
              {subtitle}
            </p>) : null}
        </div>
      </div>
    </div>);
}
