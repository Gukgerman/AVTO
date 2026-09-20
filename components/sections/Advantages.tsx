import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  { title: "Прозорі ціни", text: "Фіксована вартість оренди без прихованих доплат" },
  { title: "Особиста перевірка", text: "Оглядаємо авто наживо перед кожною орендою" },
  { title: "Юридичний супровід", text: "Готуємо договір оренди та всі документи" },
];

export function Advantages() {
  return (
    <section className="bg-white px-3 py-10 sm:px-4 sm:py-14 lg:px-6 lg:py-16">
      <div className="relative mx-auto overflow-hidden rounded-[20px] bg-navy-dark p-6 sm:rounded-[28px] sm:p-9 lg:rounded-[32px] lg:p-11 max-w-container">
        <Image
          src="/images/advantages-bg.jpg"
          alt=""
          fill
          sizes="1600px"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-navy-dark/70" />
        <div className="relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <Reveal className="flex flex-1 flex-col gap-5">
            <Eyebrow tone="light">ПЕРЕВАГИ</Eyebrow>
            <h2 className="max-w-[590px] font-display text-2xl font-bold leading-tight text-white sm:text-[32px] lg:max-w-none lg:text-[34px] lg:leading-[1.22]">
              <span className="sm:hidden">
                Гарантуємо прозорість на кожному кроці —
                <br />
                від бронювання до
                <br />
                повернення авто
              </span>
              <span className="hidden sm:inline lg:hidden">
                Гарантуємо прозорість на кожному кроці — від бронювання до повернення авто
              </span>
              <span className="hidden lg:inline">
                Гарантуємо прозорість на
                <br />
                кожному кроці — від бронювання
                <br />
                до повернення авто
              </span>
            </h2>
            <p className="max-w-[500px] text-sm leading-relaxed text-white/65 sm:text-base lg:max-w-[454px]">
              Клієнт бачить реальний стан авто і повну
              вартість оренди ще до оплати — жодних прихованих комісій.
            </p>
            <div>
              <ArrowButton href="#form" variant="amber" size="lg">
                Отримати консультацію
              </ArrowButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative aspect-[460/340] w-full overflow-hidden rounded-2xl lg:w-[calc((100%-2rem)/3)] lg:shrink-0">
            <video
              src="/video/advantages.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-black/35 px-5 py-4 backdrop-blur-[2px]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber">
                <Image src="/icons/shield.svg" alt="" width={14} height={15} className="-scale-y-100" />
              </span>
              <p className="text-sm text-white">
                Перевіряємо кожне авто особисто
                <br />
                перед кожною орендою
              </p>
            </div>
          </Reveal>
        </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-10">
            {features.map((f, i) => (
              <Reveal
                key={f.title}
                delay={i * 0.08}
                className="rounded-2xl border border-white/[0.12] bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber/40 hover:bg-white/[0.09]"
              >
                <h3 className="font-display text-base font-semibold text-white sm:text-[17px]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
