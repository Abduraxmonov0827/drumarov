"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { defaultLocale, localizedPath, type Locale } from "@/lib/i18n";
type Props = Omit<React.ComponentProps<typeof Link>, "href"> & {
    href: string;
};
export function LocalizedLink(props: Props) {
    const { href, ...rest } = props;
    const params = useParams();
    const locale = (params?.locale as Locale | undefined) ?? defaultLocale;
    return <Link href={localizedPath(locale, href)} {...rest}/>;
}
