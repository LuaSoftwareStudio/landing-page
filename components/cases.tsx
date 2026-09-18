import { ContactButton } from "@/components/contact-dialog";
import { CtaArrow } from "@/components/cta-arrow";
import { ProductPreview } from "@/components/product-preview";

const cases = [
  {
    title: "Sistema de gestão",
    type: "Plataforma web",
    body: "Uma plataforma desenvolvida para simplificar operações e centralizar processos.",
    tags: ["UX/UI", "Web", "Backend"],
    preview: "ops" as const,
  },
  {
    title: "Presença digital",
    type: "Experiência web",
    body: "Um produto digital pensado para apresentar o trabalho com clareza e gerar conversas com os clientes certos.",
    tags: ["UX/UI", "Web", "Conteúdo"],
    preview: "web" as const,
  },
  {
    title: "Produto contínuo",
    type: "Aplicativo",
    body: "Uma experiência mobile e web acompanhada depois da entrega, pronta para evoluir com o uso real.",
    tags: ["Produto", "Mobile", "Evolução"],
    preview: "app" as const,
  },
];

export function Cases() {
  return (
    <section id="casos" className="scroll-mt-24 bg-bg" aria-labelledby="casos-title">
      <div className="section-shell section-space">
        <p className="section-kicker">Casos</p>
        <h2 id="casos-title" className="section-title mt-3 max-w-2xl text-ink">
          Projetos que colocamos em produção
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
          Recortes do tipo de produto que a Lua constrói. Os detalhes de cada
          cliente entram aqui quando o material do projeto estiver pronto.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.title}
              className="group stagger-card flex flex-col overflow-hidden rounded-[28px] border border-ink/8 bg-bg-white motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-ink/20 motion-safe:hover:shadow-[0_18px_40px_rgb(23_23_23/0.06)]"
            >
              <div className="case-visual aspect-[16/10] bg-hero p-4">
                <ProductPreview variant={item.preview} />
              </div>
              <div className="flex flex-1 flex-col px-6 py-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-label">
                  {item.type}
                </p>
                <h3 className="mt-3 text-[1.35rem] font-medium tracking-[-0.03em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-ink-soft">{item.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink-soft"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <ContactButton className="group/cta mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm text-ink transition-opacity duration-200 hover:opacity-60">
                  Conversar sobre um projeto assim
                  <CtaArrow />
                </ContactButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
