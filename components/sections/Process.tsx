"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InlineImageHeading } from "@/components/ui/InlineImageHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Lines } from "@/components/ui/Lines";
import type { Dictionary, ProcessCard } from "@/lib/i18n/types";
import { ArrowUpRightIcon } from "@/components/ui/icons";

function ProcessCardContent({ card, bookCta }: { card: ProcessCard; bookCta: string }) {
  const CardTag = card.featured ? "a" : "div";
  return (
    <CardTag
      {...(card.featured ? { href: "#form", "aria-label": bookCta } : {})}
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
          {card.textLines ? (
            <Lines lines={card.textLines} />
          ) : card.mobileTextLines ? (
            <>
              <span className="sm:hidden">
                <Lines lines={card.mobileTextLines} />
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

export function Process({ t, bookCta }: { t: Dictionary["process"]; bookCta: string }) {
  const processCards = t.cards;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <section id="process" className="bg-white px-4 pt-8 pb-16 sm:px-6 sm:py-20 lg:px-[60px] lg:py-[60px]">
      <div className="mx-auto flex max-w-container flex-col gap-10">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <InlineImageHeading
            segments={t.heading}
          />
          <p className="max-w-[700px] text-[15px] leading-relaxed text-gray">
            <span className="sm:hidden">
              <Lines lines={t.textMobile} />
            </span>
            <span className="hidden sm:inline">{t.text}</span>
          </p>
        </Reveal>

        {/* Desktop/Tablet: unchanged grid */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {processCards.map((card, i) => (
            <Reveal key={card.number} delay={i * 0.06}>
              <ProcessCardContent card={card} bookCta={bookCta} />
            </Reveal>
          ))}
        </div>

        {/* Mobile-only: one-card-at-a-time swipeable slider */}
        <div className="sm:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto"
          >
            {processCards.map((card) => (
              <div key={card.number} className="w-full shrink-0 snap-center">
                <ProcessCardContent card={card} bookCta={bookCta} />
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-center gap-2">
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
