"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/ui/Reveal";
import { Lines } from "@/components/ui/Lines";
import type { Dictionary } from "@/lib/i18n";

export function Advantages({ t }: { t: Dictionary["advantages"] }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Some mobile browsers ignore the JSX `muted` attribute for autoplay
    // eligibility and need the property set imperatively, plus an explicit
    // play() call (the returned promise can reject silently, which is fine).
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="bg-white px-3 pt-5 pb-5 sm:px-4 sm:py-14 lg:px-6 lg:pt-16 lg:pb-[38px]">
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
            <Eyebrow tone="light">{t.eyebrow}</Eyebrow>
            <h2 className="max-w-[590px] font-display text-2xl font-bold leading-tight text-white sm:text-[32px] lg:max-w-none lg:text-[34px] lg:leading-[1.22]">
              <span className="sm:hidden">
                <Lines lines={t.headingMobile} />
              </span>
              <span className="hidden sm:inline lg:hidden">{t.headingTablet}</span>
              <span className="hidden lg:inline">
                <Lines lines={t.headingDesktop} />
              </span>
            </h2>
            <p className="max-w-[500px] text-sm leading-relaxed text-white/65 sm:text-base lg:max-w-[454px]">
              {t.text}
            </p>
            <div>
              <ArrowButton href="#form" variant="amber" size="lg">
                {t.cta}
              </ArrowButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative aspect-[460/340] w-full overflow-hidden rounded-2xl lg:w-[calc((100%-2rem)/3)] lg:shrink-0">
            <video
              ref={videoRef}
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
                <Lines lines={t.videoCaption} />
              </p>
            </div>
          </Reveal>
        </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-10">
            {t.features.map((f, i) => (
              <Reveal
                key={f.title}
                delay={i * 0.08}
                className="rounded-2xl border border-white/[0.12] bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber/40 hover:bg-white/[0.09]"
              >
                <h3 className="font-display text-base font-semibold text-white sm:text-[17px]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  <span className="sm:hidden">
                    {f.text.replace(f.mobileBreakBefore, "")}
                    <br />
                    {f.mobileBreakBefore}
                  </span>
                  <span className="hidden sm:inline">{f.text}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
