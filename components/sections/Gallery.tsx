import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/ui/Reveal";

const tiles = [
  { image: "/images/gallery-1.jpg", label: "Mercedes-Benz S-Class · 2023", featured: true, span: "lg:col-span-3" },
  { image: "/images/gallery-2.jpg", label: "BMW X7 · 2022", featured: false, span: "lg:col-span-2" },
  { image: "/images/gallery-3.jpg", label: "Porsche Cayenne · 2023", featured: false, span: "lg:col-span-2", objectPosition: "50% 70%" },
  { image: "/images/gallery-4.jpg", label: "Range Rover · 2022", featured: true, span: "lg:col-span-3" },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-[60px] lg:py-[100px]">
      <div className="mx-auto flex max-w-container flex-col gap-10">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4">
            <Eyebrow>ФОТОГАЛЕРЕЯ</Eyebrow>
            <h2 className="max-w-[500px] font-display text-2xl font-bold leading-tight text-navy sm:text-[32px] lg:text-[34px]">
              Автомобілі, <span className="text-amber">доступні</span>
              <br />
              для щоденної оренди
            </h2>
          </div>
          <ArrowButton variant="light" size="sm">
            Весь каталог
          </ArrowButton>
        </Reveal>

        <div className="flex flex-col gap-5">
          {[tiles.slice(0, 2), tiles.slice(2, 4)].map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:aspect-[1480/420]">
              {row.map((tile, i) => (
                <Reveal
                  key={tile.label}
                  delay={(rowIndex * 2 + i) * 0.06}
                  className={tile.span}
                >
                  <a
                    href="#form"
                    aria-label={`Забронювати ${tile.label}`}
                    className={`group relative block aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[920/420] lg:aspect-auto lg:h-full`}
                  >
                    <Image
                      src={tile.image}
                      alt={tile.label}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={tile.objectPosition ? { objectPosition: tile.objectPosition } : undefined}
                    />
                    <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
                      <span
                        className={`rounded-pill bg-white/90 px-4 py-2 font-semibold text-navy ${
                          tile.featured ? "text-[15px]" : "text-xs"
                        }`}
                      >
                        {tile.label}
                      </span>
                      {tile.featured && (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber font-bold text-navy transition-transform duration-300 group-hover:rotate-45">
                          ↗
                        </span>
                      )}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
