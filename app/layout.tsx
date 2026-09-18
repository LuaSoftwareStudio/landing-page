import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { SkipLink } from "@/components/skip-link";
import { site } from "@/lib/site";
import "./globals.css";

const title = `${site.name} — Produtos digitais que movem o seu negócio`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title,
    description: site.description,
    locale: "pt_BR",
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg-white font-sans text-ink antialiased">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
