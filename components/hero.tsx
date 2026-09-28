import { ContactButton } from "@/components/contact-dialog";
import { CtaArrow } from "@/components/cta-arrow";
import { ProductPreview } from "@/components/product-preview";

export function Hero() {
  return (
    <section className="dark-section bg-hero text-white" aria-labelledby="hero-title">
      <div className="section-shell grid min-w-0 items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/65">
            Estratégia, design e tecnologia
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.25rem] font-medium leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem]"
          >
            Do problema ao
            <br />
            produto digital.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-on-dark sm:text-lg">
            A Lua cria sistemas, aplicativos, plataformas e experiências
            digitais para o negócio avançar — com clareza de produto, não só
            com código.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-x-6">
            <ContactButton className="group/cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm text-ink transition-opacity duration-200 hover:opacity-80">
              Começar um projeto
              <CtaArrow />
            </ContactButton>
            <a
              href="#servicos"
              className="group/cta inline-flex min-h-11 items-center justify-center gap-2 text-sm text-white/90 transition-opacity duration-200 hover:opacity-100"
            >
              Ver nossos serviços
              <CtaArrow />
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 rounded-full bg-white/[0.03]" />
          <div className="relative">
            <ProductPreview variant="hero" />
            <p className="mt-4 text-xs tracking-[0.18em] text-white/55 uppercase">
              Descobrir → Definir → Construir → Evoluir
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
