"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/ui/Reveal";
import { serviceSlides, TOTAL_PLANNED_SLIDES } from "@/lib/services-data";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

const slideTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

export function Services() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const slide = serviceSlides[index];
  const total = serviceSlides.length;

  function goTo(next: number, dir: 1 | -1) {
    setDirection(dir);
    setIndex(next);
  }

  function goPrev() {
    goTo((index - 1 + total) % total, -1);
  }

  function goNext() {
    goTo((index + 1) % total, 1);
  }

  return (
    <section id="services" className="bg-white px-4 pt-8 pb-16 sm:px-6 sm:py-20 lg:px-[60px] lg:pt-11 lg:pb-[53px]">
      <div className="mx-auto flex max-w-container flex-col gap-8 lg:gap-10">
        <Reveal>
          <Eyebrow>Послуги</Eyebrow>
        </Reveal>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <Reveal delay={0.05} className="flex flex-col gap-6 lg:w-[520px] lg:shrink-0">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={slideTransition}
                className="flex flex-col gap-6"
              >
                <span className="font-display text-7xl font-bold text-navy/10 sm:text-8xl">
                  {slide.number}
                </span>
                <h3 className="font-display text-2xl font-extrabold text-navy sm:text-[32px] lg:text-[34px]">
                  {slide.number === "02" && (
                    <>
                      Подача в
                      <br />
                      будь-яку точку
                    </>
                  )}
                  {slide.number === "03" && (
                    <>
                      Авто для
                      <br />
                      особливої події
                    </>
                  )}
                  {slide.number === "04" && (
                    <>
                      Оренда на
                      <br />
                      тривалий термін
                    </>
                  )}
                  {slide.number !== "02" && slide.number !== "03" && slide.number !== "04" && slide.title}
                </h3>
                <p className="text-[13px] text-gray">{slide.subtitle}</p>
                <p className="max-w-[431px] text-sm leading-relaxed text-gray sm:text-[15px]">
                  {slide.number === "02" && (
                    <>
                      Привозимо авто до готелю, аеропорту чи офісу —
                      <br />
                      точно у зазначений час, без затримок.
                    </>
                  )}
                  {slide.number === "04" && (
                    <>
                      Знижки при довгостроковій оренді та
                      <br />
                      можливість заміни авто протягом терміну.
                    </>
                  )}
                  {slide.number !== "02" && slide.number !== "04" && slide.description}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {slide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-pill bg-amber px-4 py-2 text-[13px] font-medium text-navy"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[327px] text-xs leading-relaxed text-gray">{slide.note}</p>
                  <ArrowButton href="#form" variant="dark" size="md">
                    {slide.ctaLabel}
                  </ArrowButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-1 flex-col gap-5">
            <div className="relative aspect-[896/422] w-full overflow-hidden rounded-2xl sm:rounded-[40px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={slideTransition}
                  className="absolute inset-0"
                >
                  {slide.image ? (
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-border bg-surface-light text-gray">
                      <span className="font-display text-sm font-semibold uppercase tracking-wide">
                        Фото додається
                      </span>
                      <span className="text-xs">{slide.title}</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="flex flex-1 flex-col gap-2.5">
                <span className="text-[13px] font-medium text-gray">
                  {String(index + 1).padStart(2, "0")}/{String(TOTAL_PLANNED_SLIDES).padStart(2, "0")}
                </span>
                <div className="flex gap-3">
                  {Array.from({ length: TOTAL_PLANNED_SLIDES }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                        i === index ? "bg-navy" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  aria-label="Попередній слайд"
                  onClick={goPrev}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-gray transition-all duration-300 hover:scale-105 hover:bg-surface-light"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <button
                  aria-label="Наступний слайд"
                  onClick={goNext}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-all duration-300 hover:scale-105 hover:bg-navy/90"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
