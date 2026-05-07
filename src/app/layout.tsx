import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { site } from "@/lib/site";
const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin", "cyrillic"],
    weight: ["400", "500", "600", "700", "800"],
});
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
export const metadata: Metadata = { 
    title: {
        default: site.name,
        template: `%s | ${site.name}`,
    },
    description: "MedFit — hijoma (xijoma) muolajasi va salomatlik markazi. Professional jamoa, qabulga yozilish va yangiliklar.",
    metadataBase: new URL("https://drumarov-wskx.vercel.app"),
    keywords: [
        "MedFit",
        "hijama",
        "xijoma",
        "klinika",
        "shifokorlar",
        "Toshkent",
    ],
    openGraph: {
        title: site.name,
        description: "Hijoma (xijoma) va salomatlik markazi. Qabulga yozilish, shifokorlar va xizmatlar.",
        url: "https://drumarov-wskx.vercel.app/uz",
        siteName: site.name,
        locale: "uz_UZ",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: site.name,
        description: "Hijoma (xijoma) va salomatlik markazi. Professional jamoa va zamonaviy xizmatlar.",
    },
};
export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="uz" className={`${montserrat.variable} ${geistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans text-brand-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>);
}
