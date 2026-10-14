import { SmoothScroll } from "@/components/SmoothScroll";
import { MotionProvider } from "@/components/MotionProvider";
import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Advantages } from "@/components/sections/Advantages";
import { Gallery } from "@/components/sections/Gallery";
import { Faq } from "@/components/sections/Faq";
import { Process } from "@/components/sections/Process";
import { CtaForm } from "@/components/sections/CtaForm";
import { Footer } from "@/components/sections/Footer";
import { getDictionary, type Locale } from "@/lib/i18n";
import { inter, unbounded } from "@/lib/fonts";

/** Shared document shell for every locale's root layout. */
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${unbounded.variable} font-sans antialiased`}>
        <MotionProvider>
          <Preloader />
          <SmoothScroll />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <main>
      <Hero locale={locale} t={t} />
      <About t={t.about} />
      <Services t={t.services} />
      <Advantages t={t.advantages} />
      <Gallery t={t.gallery} />
      <Faq t={t.faq} />
      <Process t={t.process} bookCta={t.bookCta} />
      <CtaForm t={t.form} locale={locale} />
      <Footer t={t.footer} />
    </main>
  );
}
