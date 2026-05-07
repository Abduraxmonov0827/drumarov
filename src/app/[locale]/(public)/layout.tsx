import { AosInitLoader } from "@/components/aos-init-loader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
export default async function PublicLayout({ children, params, }: Readonly<{
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>;
}>) {
    const { locale } = await params;
    const dictionary = getDictionary(locale);
    return (<>
      <AosInitLoader />
      <SiteHeader locale={locale as Locale} dictionary={dictionary}/>
      <div className="relative flex-1 overflow-hidden">
        <div className="blueprint-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="noise-overlay pointer-events-none absolute inset-0 -z-10" />
        <div className="hero-glow pointer-events-none absolute -left-24 top-0 -z-10 h-[30rem] w-[30rem] rounded-full" />
        <div className="hero-glow-secondary pointer-events-none absolute right-0 top-[24rem] -z-10 h-[28rem] w-[28rem] rounded-full" />
        {children}
      </div>
      <SiteFooter locale={locale as Locale} dictionary={dictionary}/>
    </>);
}
