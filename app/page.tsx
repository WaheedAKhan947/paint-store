import Background from "@/components/Background";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import { CTA, FloatingWhatsApp, Footer, Gallery, Process, ShadeWall, Stats, Visit } from "@/components/Sections";
import { Marquee } from "@/components/ui";

const ticker = ["Brighto Super Emulsion", "All Weather Exterior", "Synthetic Enamel", "Wood Polish", "Wall Primer", "Acrylic Putty", "Brushes & Rollers", "Wholesale Rates"];

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <div className="overflow-hidden py-6"><div className="-mx-10 -rotate-1 border-y border-navy/10 shadow-sm">
          <Marquee items={ticker} />
        </div></div>
        <Products />
        <ShadeWall />
        <Process />
        <Gallery />
        <Stats />
        <CTA />
        <Visit />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
