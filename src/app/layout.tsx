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
