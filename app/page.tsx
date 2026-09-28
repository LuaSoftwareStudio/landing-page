import { ContactCta } from "@/components/contact-cta";
import { ContactProvider } from "@/components/contact-dialog";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { Services } from "@/components/services";
import { SiteChat } from "@/components/site-chat";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhyLua } from "@/components/why-lua";

export default function Home() {
  return (
    <ContactProvider>
      <div id="topo" className="flex min-h-full flex-col">
        <SiteHeader />
        <main id="conteudo">
          <Hero />
          <Services />
          <WhyLua />
          <Process />
          <ContactCta />
        </main>
        <SiteFooter />
        <SiteChat />
      </div>
    </ContactProvider>
  );
}
