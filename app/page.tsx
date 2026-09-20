import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Advantages } from "@/components/sections/Advantages";
import { Gallery } from "@/components/sections/Gallery";
import { Faq } from "@/components/sections/Faq";
import { Process } from "@/components/sections/Process";
import { CtaForm } from "@/components/sections/CtaForm";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Advantages />
      <Gallery />
      <Faq />
      <Process />
      <CtaForm />
      <Footer />
    </main>
  );
}
