const services = [
  {
    number: "01",
    title: "Sites e experiências digitais",
    body: "Criamos experiências digitais rápidas, claras e alinhadas ao negócio — da presença da marca até a conversão.",
  },
  {
    number: "02",
    title: "Sistemas internos",
    body: "Transformamos processos manuais em sistemas mais simples, para o time operar com menos fricção e mais clareza.",
  },
  {
    number: "03",
    title: "Aplicativos",
    body: "Criamos experiências mobile pensadas para pessoas reais, do primeiro uso à evolução contínua.",
  },
  {
    number: "04",
    title: "Plataformas",
    body: "Desenvolvemos produtos digitais completos, com arquitetura preparada para crescer depois da entrega.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 bg-bg" aria-labelledby="servicos-title">
      <div className="section-shell section-space">
        <p className="section-kicker">Serviços</p>
        <h2 id="servicos-title" className="section-title mt-3 max-w-2xl text-ink">
          O que podemos construir para você?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
          Cada entrega começa no problema do negócio. A tecnologia entra quando
          o caminho do produto já está claro.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.number}
              className="stagger-card rounded-[28px] border border-transparent bg-card px-7 py-8 text-white motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-white/10 sm:px-8 sm:py-9"
            >
              <p className="text-[2rem] font-medium leading-none tracking-[-0.04em] text-white/80">
                {service.number}
              </p>
              <h3 className="mt-8 text-[1.35rem] font-medium tracking-[-0.02em]">
                {service.title}
              </h3>
              <p className="mt-3 max-w-[46ch] text-base leading-7 text-muted-on-dark">
                {service.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
