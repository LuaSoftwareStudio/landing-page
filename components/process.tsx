const steps = [
  {
    number: "01",
    title: "Descobrir",
    body: "Entender o problema, o negócio e o contexto antes de decidir o caminho.",
  },
  {
    number: "02",
    title: "Definir",
    body: "Transformar necessidades em uma solução clara: produto, fluxos e arquitetura.",
  },
  {
    number: "03",
    title: "Construir",
    body: "Projetar e desenvolver o produto com foco em qualidade, uso e entrega.",
  },
  {
    number: "04",
    title: "Evoluir",
    body: "Medir, ajustar e continuar crescendo depois que o produto está no ar.",
  },
];

export function Process() {
  return (
    <section
      id="processo"
      className="scroll-mt-24 bg-bg"
      aria-labelledby="processo-title"
    >
      <div className="section-shell section-space">
        <p className="section-kicker">Processo</p>
        <h2 id="processo-title" className="section-title mt-3 max-w-2xl text-ink">
          Um ciclo, não uma entrega isolada
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
          Descobrir, definir, construir e evoluir. A mesma lógica de um produto
          que continua se transformando depois do lançamento.
        </p>
        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-0">
          <span
            className="pointer-events-none absolute top-[1.15rem] right-[8%] left-[8%] hidden h-px bg-ink/10 lg:block"
            aria-hidden="true"
          />
          {steps.map((step, index) => (
            <li key={step.number} className="relative lg:px-4">
              {index < steps.length - 1 ? (
                <span
                  className="absolute top-12 left-[1.05rem] h-[calc(100%-1.5rem)] w-px bg-ink/10 lg:hidden"
                  aria-hidden="true"
                />
              ) : null}
              <p className="relative z-10 inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-ink/10 bg-bg text-sm font-medium text-ink">
                {step.number}
              </p>
              <h3 className="mt-5 text-[1.35rem] font-medium tracking-[-0.03em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[28ch] text-base leading-7 text-ink-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
