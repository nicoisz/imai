import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FooterReveal } from "@/components/layout/FooterReveal";
import { ToneBackground } from "@/components/layout/ToneBackground";
import { Hero } from "@/components/home/Hero";
import { Mission } from "@/components/home/Mission";
import { Solutions } from "@/components/home/Solutions";
import { Highlight } from "@/components/home/Highlight";
import { TechMarquee } from "@/components/home/TechMarquee";
import { Convictions } from "@/components/home/Convictions";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-olive focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Saltar al contenido
      </a>

      {/* Queda fija al fondo; el contenido la descubre al final. */}
      <FooterReveal />

      <div className="relative pb-[var(--footer-reveal-h)]">
        <ToneBackground />
        <Header />

        <main id="contenido">
          <Hero />
          <Mission />
          <Solutions />
          <Highlight />
          <TechMarquee />
          <Convictions />
          <ContactCTA />
        </main>

        <Footer />
      </div>
    </>
  );
}
