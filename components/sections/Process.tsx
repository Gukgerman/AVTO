"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InlineImageHeading } from "@/components/ui/InlineImageHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processCards, type ProcessCard } from "@/lib/process-data";
import { ArrowUpRightIcon } from "@/components/ui/icons";

const CARD_COUNT = processCards.length;

function ProcessCardContent({ card }: { card: ProcessCard }) {
  const CardTag = card.featured ? "a" : "div";
  return (
    <CardTag
      {...(card.featured ? { href: "#form", "aria-label": "Забронювати авто" } : {})}
      className={`group relative flex h-full min-h-[372px] flex-col justify-between overflow-hidden rounded-3xl px-9 pb-8 pt-[76px] transition-all duration-300 hover:-translate-y-1 ${
        card.featured
          ? "bg-navy-dark"
          : "border border-border bg-white shadow-[0_16px_32px_-8px_rgba(14,20,29,0.08)] hover:border-amber/40 hover:shadow-[0_24px_40px_-12px_rgba(14,20,29,0.14)]"
      }`}
    >
      <span
        className={`pointer-events-none absolute left-[27px] top-[7px] select-none font-display font-black leading-none ${
          card.featured ? "text-[130px] text-white/5" : "text-[130px] text-navy/5"
        }`}
      >
        {card.number}
      </span>

      <div className="relative flex flex-col gap-3">
        <span className="flex h-[49px] w-[49px] items-center justify-center rounded-[11px] bg-amber transition-transform duration-300 group-hover:scale-110">
          <Image src={card.icon} alt="" width={28} height={28} className="h-7 w-7 -scale-y-100 object-contain" />
        </span>
        <h3 className={`font-display text-2xl font-bold ${card.featured ? "text-white" : "text-navy"}`}>
          {card.title}
        </h3>
        <p className={`text-base ${card.featured ? "text-white/65" : "text-gray"}`}>
          {card.number === "03" ? (
            <>
              Привозимо чисте авто
              <br />
              у зручне місце в Одесі
            </>
          ) : card.number === "02" ? (
            <>
              <span className="sm:hidden">
                Погоджуємо деталі й фіксуємо
                <br />
                ціну в договорі оренди
              </span>
              <span className="hidden sm:inline">{card.text}</span>
            </>
          ) : card.number === "04" ? (
            <>
              <span className="sm:hidden">
                Повертаєте авто в обумовлений
                <br />
                час і місце — без зайвих питань
              </span>
              <span className="hidden sm:inline">{card.text}</span>
            </>
          ) : (
            card.text
          )}
        </p>
      </div>

      {card.featured && (
        <span
          aria-hidden
          className="relative mt-6 flex h-11 w-11 items-center justify-center rounded-full bg-amber font-bold text-navy transition-transform duration-300 group-hover:rotate-45"
        >
          <ArrowUpRightIcon className="h-4 w-4" />
        </span>
      )}
    </CardTag>
  );
}

export function Process() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      if (window.innerWidth >= 640) {
        track.style.transform = "translateX(0%)";
        return;
      }

      const viewportH = window.innerHeight;
      const total = wrapper.offsetHeight - viewportH;
      let progress = 0;
      if (total > 0) {
        const top = wrapper.getBoundingClientRect().top;
        progress = Math.min(1, Math.max(0, -top / total));
      }
      const shift = progress * (CARD_COUNT - 1) * 100;
      track.style.transform = `translateX(-${shift}%)`;
      const nextIndex = Math.round(progress * (CARD_COUNT - 1));
      setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="process" className="bg-white px-4 pt-8 pb-4 sm:px-6 sm:py-20 lg:px-[60px] lg:py-[60px]">
      <div className="mx-auto flex max-w-container flex-col gap-10">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>ЯК МИ ПРАЦЮЄМО</Eyebrow>
          <InlineImageHeading
            segments={[
              { word: "Ваш" },
              { image: "/images/chip-process.png", alt: "" },
              { word: "маршрут" },
              { break: true },
              { word: "до" },
              { word: "преміум", amber: true },
              { word: "авто" },
            ]}
          />
          <p className="max-w-[700px] text-[15px] leading-relaxed text-gray">
            <span className="sm:hidden">
              Кожен крок прозорий — від заявки до
              <br />
              передачі ключів, без прихованих умов.
            </span>
            <span className="hidden sm:inline">
              Кожен крок прозорий — від заявки до передачі ключів, без прихованих умов.
            </span>
          </p>
        </Reveal>

        {/* Desktop/Tablet: unchanged grid */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {processCards.map((card, i) => (
            <Reveal key={card.number} delay={i * 0.06}>
              <ProcessCardContent card={card} />
            </Reveal>
          ))}
        </div>
      </div>

      {/*
        Mobile-only: the 4 cards are driven by vertical scroll instead of a
        horizontal swipe. The wrapper is CARD_COUNT viewport-heights tall;
        while the user scrolls through it, the inner view stays pinned
        (position: sticky) and a scroll listener converts how far the
        wrapper has scrolled past the top into a horizontal translateX on
        the card track. Once the wrapper's height is exhausted, sticky
        naturally releases and normal vertical scroll continues into the
        next section — no extra logic needed for that handoff.
      */}
      <div ref={wrapperRef} className="relative sm:hidden" style={{ height: `${CARD_COUNT * 100}dvh` }}>
        <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
          <div ref={trackRef} className="flex w-full">
            {processCards.map((card) => (
              <div key={card.number} className="w-full shrink-0 px-4">
                <ProcessCardContent card={card} />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {processCards.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-navy" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
