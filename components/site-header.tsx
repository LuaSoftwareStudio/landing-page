"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { CtaArrow } from "@/components/cta-arrow";
import { SiteLogo } from "@/components/site-logo";
import { ContactButton } from "@/components/contact-dialog";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-200 ${
        scrolled
          ? "border-ink/10 bg-bg-white/95 shadow-[0_1px_0_rgb(23_23_23/0.04)]"
          : "border-transparent bg-bg-white/80"
      }`}
    >
      <div className="section-shell flex min-h-[4.5rem] items-center justify-between gap-2 sm:min-h-[5.5rem] sm:gap-4">
        <SiteLogo variant="on-light" size="header" priority />

        <nav
          className="hidden items-center gap-8 text-base text-ink md:flex"
          aria-label="Principal"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-sm transition-opacity duration-200 hover:opacity-60"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ContactButton className="group/cta inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-ink px-3 text-sm text-white transition-opacity duration-200 hover:opacity-80 sm:gap-2 sm:px-5">
            <span className="md:hidden">Começar</span>
            <span className="hidden md:inline">Começar um projeto</span>
            <CtaArrow />
          </ContactButton>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/10 md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            {open ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-mobile"
          className="border-t border-ink/8 px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center text-base text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
