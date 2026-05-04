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
      <div className="flex-1">{children}</div>
      <SiteFooter locale={locale as Locale} dictionary={dictionary}/>
    </>);
}
