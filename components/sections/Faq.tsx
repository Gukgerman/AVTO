"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InlineImageHeading } from "@/components/ui/InlineImageHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqItems } from "@/lib/faq-data";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white px-4 pt-8 pb-8 sm:px-6 sm:py-20 lg:px-[60px] lg:py-[100px]">
      <div className="mx-auto flex max-w-container flex-col gap-10 lg:flex-row lg:gap-20">
        <Reveal className="flex flex-col gap-4 lg:w-[420px] lg:shrink-0">
          <Eyebrow>ПИТАННЯ-ВІДПОВІДІ</Eyebrow>
          <InlineImageHeading
            segments={[
              { word: "Питання," },
              { word: "які" },
              { word: "нам" },
              { image: "/images/chip-faq.png", alt: "" },
              { word: "ставлять" },
              { word: "найчастіше", amber: true },
            ]}
          />
          <p className="max-w-[380px] text-base leading-relaxed text-gray">
            <span className="sm:hidden">
              Не знайшли відповідь? Напишіть
              <br />
              нам — відповімо протягом години.
            </span>
            <span className="hidden sm:inline">
              Не знайшли відповідь? Напишіть нам — відповімо протягом години.
            </span>
          </p>
        </Reveal>

        <div className="flex flex-1 flex-col gap-4">
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={item.question} delay={i * 0.05}>
                <div className="rounded-2xl bg-surface-light px-6 py-3.5 transition-colors duration-300 hover:bg-[#ececee] sm:px-10">
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="group flex w-full items-center justify-between gap-6 py-2.5 text-left"
                  >
                    <span className="text-base font-semibold text-navy sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full text-[19px] font-bold transition-all duration-300 group-hover:scale-110 ${
                        open ? "bg-navy text-white" : "bg-amber text-navy"
                      }`}
                    >
                      {open ? "–" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && item.answer && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[500px] pb-4 text-[15px] leading-relaxed text-gray">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
