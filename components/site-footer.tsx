"use client";

import { Envelope, InstagramLogo } from "@phosphor-icons/react";
import { nav, site } from "@/lib/site";
import { SiteLogo } from "@/components/site-logo";

const footerNav = [...nav, { href: "#contato", label: "Contato" }] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/8 bg-bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-12 sm:px-8 lg:px-16 lg:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SiteLogo variant="on-light" size="header" />

          <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-2 translate-x-[30px]">
            {footerNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center text-sm text-ink transition-opacity duration-200 hover:opacity-60"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center gap-2.5 text-sm text-ink-soft underline-offset-4 transition-opacity duration-200 hover:text-ink hover:underline"
            >
              <Envelope size={18} weight="regular" aria-hidden="true" />
              {site.email}
            </a>
            <a
              href={site.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2.5 text-sm text-ink-soft underline-offset-4 transition-opacity duration-200 hover:text-ink hover:underline"
            >
              <InstagramLogo size={18} weight="regular" aria-hidden="true" />
              {site.instagram.handle}
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-ink-soft">
          © {year} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
