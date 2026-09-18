"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { ContactForm } from "@/components/contact-form";

type ContactContextValue = {
  openContact: () => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within ContactProvider");
  }
  return context;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const openContact = useCallback(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.showModal();
  }, []);

  const closeContact = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function onClose() {
      openerRef.current?.focus();
    }

    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto max-h-[min(90dvh,40rem)] w-[min(100%-2rem,32rem)] overflow-y-auto rounded-[28px] bg-bg-white p-0 text-ink shadow-xl backdrop:bg-black/55"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeContact();
          }
        }}
      >
        <div className="px-5 py-6 sm:px-7 sm:py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="text-2xl font-medium tracking-[-0.03em]">
                O que você quer construir?
              </h2>
              <p className="mt-2 text-base leading-6 text-ink-soft">
                Conte o essencial. Abrimos o e-mail para você enviar o pedido.
              </p>
            </div>
            <button
              type="button"
              onClick={closeContact}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/10"
            >
              <span className="sr-only">Fechar</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6">
            <ContactForm variant="on-light" />
          </div>
        </div>
      </dialog>
    </ContactContext.Provider>
  );
}

export function ContactButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { openContact } = useContact();

  return (
    <button
      type="button"
      className={`appearance-none font-sans ${className ?? ""}`}
      onClick={() => {
        onClick?.();
        openContact();
      }}
    >
      {children}
    </button>
  );
}
