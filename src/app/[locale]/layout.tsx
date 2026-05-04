import { LocaleHtmlLang } from "@/components/locale-html-lang";
import { isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({ children, params, }: Readonly<{
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>;
}>) {
    const { locale } = await params;
    if (!isLocale(locale)) {
        notFound();
    }
    return (<>
      <LocaleHtmlLang locale={locale}/>
      {children}
    </>);
}
