import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InlineImageHeading } from "@/components/ui/InlineImageHeading";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

const stats = [
  { main: "24/7", count: null, suffix: "", amber: false, label: "підтримка клієнтів" },
  { main: "20", count: 20, suffix: " Lux", amber: false, label: "авто в автопарку" },
  { main: "250", count: 250, suffix: " км", amber: true, label: "включено в добу*" },
];

const cards = [
  { title: "Підбір авто", text: "Обираєте модель під подію чи поїздку", image: "/images/about-1.jpg" },
  { title: "Огляд і договір", text: "Перевіряємо авто та підписуємо документи", video: "/video/wmremove-transformed.mp4" },
  { title: "Подача авто", text: "Привозимо авто в будь-яку точку Одеси", image: "/images/about-3.jpg" },
];

export function About() {
  return (
    <section id="about" className="bg-white px-4 pt-16 pb-8 sm:px-6 sm:py-20 lg:px-[60px] lg:py-[100px]">
      <div className="mx-auto flex max-w-container flex-col gap-14 lg:gap-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <Reveal className="flex shrink-0 flex-col gap-8 lg:w-[300px]">
            <Eyebrow>ПРО НАС</Eyebrow>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {stats.map((s, i) => (
                <div key={s.label} className={i === 2 ? "col-span-2" : undefined}>
                  <p className="font-display font-extrabold leading-none">
                    <span className={`text-[32px] sm:text-[40px] ${s.amber ? "text-amber" : "text-navy"}`}>
                      {s.count !== null ? <Counter to={s.count} /> : s.main}
                    </span>
                    {s.suffix && (
                      <span className={`text-xl !leading-none sm:text-2xl ${s.amber ? "text-amber" : "text-navy"}`}>
                        {s.suffix}
                      </span>
                    )}
                  </p>
                  <p className="mt-1.5 max-w-[120px] text-[13px] text-gray">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-1 flex-col gap-6">
            <InlineImageHeading
              className="lg:max-w-[756px]"
              segments={[
                { word: "Кожне" },
                { word: "авто" },
                { word: "проходить" },
                { word: "повну", amber: true },
                { image: "/images/chip-about.png", alt: "" },
                { word: "підготовку,", amber: true },
                { word: "перш" },
                { word: "ніж" },
                { word: "потрапити" },
                { break: true },
                { word: "до" },
                { word: "Вас" },
              ]}
            />
            <p className="max-w-[640px] text-base leading-relaxed text-gray sm:text-lg">
              Особисто контролюємо кожен етап оренди — від перевірки автомобіля до його
              повернення. Завжди на зв&rsquo;язку та уважні до кожної деталі.
            </p>
            <div>
              <ArrowButton href="#services" variant="dark" size="lg">
                Дізнатись більше
              </ArrowButton>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08} className="group flex flex-col gap-4">
              <div className="relative aspect-[460/300] w-full overflow-hidden rounded-2xl">
                {card.video ? (
                  <video
                    src={card.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={card.image!}
                    alt={card.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy sm:text-xl">{card.title}</h3>
                <p className="mt-1.5 text-sm text-gray sm:text-base">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
