import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { StarfieldBackground } from "@/components/layout/StarfieldBackground";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { TechnologyStack } from "@/components/home/TechnologyStack";
import { Manifesto } from "@/components/home/Manifesto";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[3px] focus:bg-foreground focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-background"
      >
        Saltar al contenido
      </a>

      <NoiseOverlay />
      <StarfieldBackground />
      <Header />

      <main id="contenido">
        <Hero />
        <ServicesGrid />
        <FeaturedProjects />
        <PhilosophySection />
        <TechnologyStack />
        <Manifesto />
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}
