export const site = {
  name: "Lua Software Studio",
  shortName: "lua.",
  email: "luasoftwarestudio@gmail.com",
  instagram: {
    handle: "luasoftwarestudio",
    href: "https://www.instagram.com/luasoftwarestudio",
  },
  description:
    "Do problema ao produto digital. Estratégia, design e tecnologia para criar sistemas, aplicativos, plataformas e experiências que fazem o negócio avançar.",
} as const;

export const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
] as const;

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export function buildContactMailto({
  name,
  email,
  company,
  message,
}: ContactPayload) {
  const subject = `Projeto com a Lua Software Studio — ${name}`;
  const body = [
    `Nome: ${name}`,
    `E-mail: ${email}`,
    company ? `Empresa: ${company}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

