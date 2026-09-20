import Image from "next/image";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { MobileMenu } from "@/components/MobileMenu";
import { Reveal } from "@/components/ui/Reveal";
import { navLinks } from "@/lib/nav";

const avatars = ["/images/avatar-1.png", "/images/avatar-2.png", "/images/avatar-3.png"];

export function Hero() {
  return (
    <section className="bg-white px-3 pt-3 pb-1.5 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <div className="relative flex min-h-[640px] flex-col overflow-hidden rounded-[20px] bg-navy-dark p-5 sm:min-h-[760px] sm:rounded-[28px] sm:p-8 lg:h-[calc(100dvh-3rem)] lg:min-h-[640px] lg:rounded-[32px] lg:p-11">
        <Image
          src="/images/hero-bg.png"
          alt="Преміум авто на подвір'ї сучасного будинку"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-dark/65 sm:bg-navy-dark/50" />

        {/* top nav */}
        <div className="relative z-20 flex items-center justify-between">
          <span className="font-display text-lg font-extrabold tracking-tight text-white sm:text-xl lg:text-2xl">
            PRESTIGE
          </span>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <ArrowButton href="#form" variant="light" size="sm">
              Забронювати авто
            </ArrowButton>
          </div>

          <MobileMenu />
        </div>

        {/* content */}
        <div className="relative z-10 mt-auto flex flex-col gap-6 pt-16 sm:gap-7 lg:gap-8">
          {/*
            Hero content is already inside the viewport on mount, so Reveal's
            whileInView would normally fire (and finish) while the Preloader
            overlay still covers it — making the entrance look instant/absent
            once the overlay clears. The delays below are offset to start
            only after the Preloader's guaranteed-visible window (900ms) plus
            its fade-out (500ms), so the sequence actually plays on screen.
          */}
          <Reveal y={16} delay={1.3} className="inline-flex w-fit items-center gap-2 rounded-pill border border-white/25 bg-white/10 px-3.5 py-2 sm:px-4">
            <span className="h-2 w-2 animate-status-pulse rounded-full bg-amber" />
            <span className="text-xs font-semibold text-white/90 sm:text-[13px]">
              3+ РОКІВ ОРЕНДИ В ОДЕСІ
            </span>
          </Reveal>

          <Reveal y={20} delay={1.42}>
            <h1 className="font-display text-[40px] font-black uppercase leading-[1.02] tracking-tight text-white sm:text-[64px] lg:text-[70px] xl:text-[100px]">
              ПРЕМІУМ
              <br />
              АВТО В ОДЕСІ
            </h1>
          </Reveal>

          <Reveal y={16} delay={1.54}>
            <p className="max-w-[500px] text-base leading-snug text-white/70 sm:text-lg sm:leading-relaxed">
              Mercedes, BMW, Porsche та інші авто преміум-класу — швидка подача, без застав і
              посередників.
            </p>
          </Reveal>

          <Reveal y={16} delay={1.66} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <ArrowButton href="#form" variant="amber" size="lg">
                Забронювати авто
              </ArrowButton>

              <div className="flex items-center gap-3.5">
                <div className="flex">
                  {avatars.map((src, i) => (
                    <span
                      key={src}
                      className="-ml-2.5 h-12 w-12 overflow-hidden rounded-full border-2 border-navy-dark first:ml-0 transition-transform duration-300 hover:z-10 hover:scale-110"
                    >
                      <Image src={src} alt="" width={48} height={48} className="h-full w-full object-cover" />
                    </span>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-white">500+</p>
                  <p className="text-white/65">відгуків кліентів</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <StatCard value="30 хв." label="подача авто по місту" />
              <StatCard value="20 Lux" label="авто в автопарку" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/[0.18] bg-white/10 px-4 py-3.5 sm:px-5 sm:py-4">
      <p className="whitespace-nowrap font-display text-lg font-bold text-white sm:text-[22px]">{value}</p>
      <p className="mt-1 max-w-[140px] text-xs text-white/65">{label}</p>
    </div>
  );
}
