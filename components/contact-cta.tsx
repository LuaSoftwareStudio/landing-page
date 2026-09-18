import { ContactForm } from "@/components/contact-form";

export function ContactCta() {
  return (
    <section
      id="contato"
      className="dark-section bg-hero text-white"
      aria-labelledby="contato-title"
    >
      <div className="section-shell section-space grid items-start gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
        <div className="max-w-xl">
          <p className="section-kicker text-white/55">Contato</p>
          <h2
            id="contato-title"
            className="section-title mt-3 text-white"
          >
            Tem uma ideia, problema ou produto em mente?
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-on-dark sm:text-lg">
            Conte o que você precisa. A Lua ajuda a transformar desafios de
            negócio em produtos digitais viáveis.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-8">
          <h3 className="text-[1.35rem] font-medium tracking-[-0.03em]">
            O que você quer construir?
          </h3>
          <p className="mt-2 text-base leading-7 text-muted-on-dark">
            Preencha o essencial. Abrimos o e-mail para você enviar o pedido.
          </p>
          <div className="mt-6">
            <ContactForm variant="on-dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
