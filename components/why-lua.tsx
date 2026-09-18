const reasons = [
  {
    title: "Estratégia antes do código",
    body: "Entendemos o problema, o usuário e o objetivo de negócio antes de escolher a tecnologia.",
  },
  {
    title: "Design orientado à experiência",
    body: "Interface bonita só vale se for fácil de usar e ajudar a pessoa a concluir o que veio fazer.",
  },
  {
    title: "Engenharia preparada para evolução",
    body: "Construímos o produto de hoje com uma base que aguenta as necessidades de amanhã.",
  },
  {
    title: "Parceria contínua",
    body: "O trabalho não termina no lançamento. Acompanhamos, medimos e seguimos melhorando.",
  },
];

export function WhyLua() {
  return (
    <section id="por-que-lua" className="border-t border-ink/8 bg-bg-white" aria-labelledby="por-que-lua-title">
      <div className="section-shell section-space">
        <p className="section-kicker">Por que Lua</p>
        <h2 id="por-que-lua-title" className="section-title mt-3 max-w-3xl text-ink">
          Não entregamos apenas código. Construímos produtos.
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          {reasons.map((reason, index) => (
            <article key={reason.title} className="max-w-md">
              <p className="text-xs font-medium tracking-[0.18em] text-label">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-[1.35rem] font-medium tracking-[-0.03em] text-ink">
                {reason.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-ink-soft">{reason.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
