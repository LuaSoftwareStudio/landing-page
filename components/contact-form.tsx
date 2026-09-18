"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CtaArrow } from "@/components/cta-arrow";
import { buildContactMailto, site, type ContactPayload } from "@/lib/site";

type ContactFormProps = {
  variant?: "on-dark" | "on-light";
  onSent?: () => void;
};

type FieldErrors = Partial<Record<keyof ContactPayload, string>>;
type FormStatus = "idle" | "sending" | "sent" | "error";

const emptyForm: ContactPayload = {
  name: "",
  email: "",
  company: "",
  message: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(values: ContactPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "Informe o seu nome.";
  }

  if (!values.email.trim()) {
    errors.email = "Informe o seu e-mail.";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!values.message.trim()) {
    errors.message = "Conte um pouco sobre o projeto.";
  } else if (values.message.trim().length < 12) {
    errors.message = "Conte um pouco mais para entendermos o pedido.";
  }

  return errors;
}

export function ContactForm({ variant = "on-dark", onSent }: ContactFormProps) {
  const formId = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const sendTimer = useRef<number | null>(null);
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactPayload, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  const dark = variant === "on-dark";
  const errorIds = {
    name: `${formId}-name-error`,
    email: `${formId}-email-error`,
    message: `${formId}-message-error`,
    summary: `${formId}-summary`,
  };

  useEffect(() => {
    return () => {
      if (sendTimer.current) window.clearTimeout(sendTimer.current);
    };
  }, []);

  function update<K extends keyof ContactPayload>(field: K, value: ContactPayload[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleBlur(field: keyof ContactPayload) {
    setTouched((current) => ({ ...current, [field]: true }));
    const nextErrors = validate({ ...values });
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setTouched({ name: true, email: true, company: true, message: true });
    setErrors(nextErrors);
    setSubmitted(true);

    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("sending");
    const href = buildContactMailto({
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      message: values.message.trim(),
    });

    sendTimer.current = window.setTimeout(() => {
      try {
        window.location.href = href;
        setStatus("sent");
        onSent?.();
      } catch {
        setStatus("error");
      }
    }, 280);
  }

  const fieldClass = dark
    ? "min-h-11 w-full rounded-xl border border-white/15 bg-white/8 px-3.5 text-base text-white outline-none transition-colors duration-200 placeholder:text-white/35 focus:border-white"
    : "min-h-11 w-full rounded-xl border border-ink/15 bg-bg-white px-3.5 text-base text-ink outline-none transition-colors duration-200 placeholder:text-ink/35 focus:border-ink";
  const labelClass = dark
    ? "mb-2 block text-[13px] font-medium leading-4 text-white"
    : "mb-2 block text-[13px] font-medium leading-4 text-ink";
  const errorClass = dark ? "mt-1.5 text-[15px] text-red-300" : "mt-1.5 text-[15px] text-red-700";

  return (
    <form className="w-full text-left" onSubmit={handleSubmit} noValidate>
      {submitted && Object.values(errors).some(Boolean) && status !== "sent" ? (
        <div
          ref={summaryRef}
          id={errorIds.summary}
          role="alert"
          tabIndex={-1}
          className={`mb-6 rounded-xl border px-4 py-3 ${
            dark ? "border-red-300/40 bg-red-300/10 text-red-100" : "border-red-700/20 bg-red-50 text-red-800"
          }`}
        >
          <p className="text-[15px] font-medium">Há um problema no formulário</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px]">
            {errors.name ? (
              <li>
                <a href={`#${formId}-name`} className="underline underline-offset-2">
                  {errors.name}
                </a>
              </li>
            ) : null}
            {errors.email ? (
              <li>
                <a href={`#${formId}-email`} className="underline underline-offset-2">
                  {errors.email}
                </a>
              </li>
            ) : null}
            {errors.message ? (
              <li>
                <a href={`#${formId}-message`} className="underline underline-offset-2">
                  {errors.message}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClass}>
            Nome
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={touched.name && Boolean(errors.name)}
            aria-describedby={touched.name && errors.name ? errorIds.name : undefined}
            className={fieldClass}
          />
          {touched.name && errors.name ? (
            <p id={errorIds.name} className={errorClass}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className={labelClass}>
            E-mail
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={touched.email && Boolean(errors.email)}
            aria-describedby={touched.email && errors.email ? errorIds.email : undefined}
            className={fieldClass}
          />
          {touched.email && errors.email ? (
            <p id={errorIds.email} className={errorClass}>
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${formId}-company`} className={labelClass}>
          Empresa{" "}
          <span className={dark ? "font-normal text-white/55" : "font-normal text-ink-soft"}>
            (opcional)
          </span>
        </label>
        <input
          id={`${formId}-company`}
          name="company"
          autoComplete="organization"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor={`${formId}-message`} className={labelClass}>
          Conte um pouco sobre seu projeto
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={touched.message && Boolean(errors.message)}
          aria-describedby={
            touched.message && errors.message ? errorIds.message : `${formId}-message-help`
          }
          className={`${fieldClass} min-h-32 resize-y py-3 leading-6`}
        />
        <p
          id={`${formId}-message-help`}
          className={`mt-1.5 text-[15px] ${dark ? "text-white/55" : "text-ink-soft"}`}
        >
          Objetivo, prazo e o tipo de produto já ajudam a começar.
        </p>
        {touched.message && errors.message ? (
          <p id={errorIds.message} className={errorClass}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
          className={
            dark
              ? "group/cta inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm text-ink transition-opacity duration-200 hover:opacity-80 disabled:cursor-wait disabled:opacity-60"
              : "group/cta inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm text-white transition-opacity duration-200 hover:opacity-80 disabled:cursor-wait disabled:opacity-60"
          }
        >
          {status === "sending" ? "Abrindo o e-mail…" : "Enviar projeto"}
          {status === "sending" ? null : <CtaArrow />}
        </button>
        <div aria-live="polite" className="text-[15px]">
          {status === "sent" ? (
            <p className={dark ? "text-white/80" : "text-ink-soft"}>
              Se o e-mail não abrir, escreva para {site.email}.
            </p>
          ) : null}
          {status === "error" ? (
            <p className={dark ? "text-red-200" : "text-red-700"} role="alert">
              Não foi possível abrir o e-mail. Escreva para {site.email}.
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
