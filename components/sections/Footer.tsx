import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const navLinks = [
  { label: "Про нас", href: "#about" },
  { label: "Послуги", href: "#services" },
  { label: "Переваги", href: "#" },
  { label: "Контакти", href: "#footer", active: true },
];

const contacts = [
  { label: "Телефон", value: "+380 93 123 21 21" },
  { label: "Email", value: "hello@prestigecars.ua" },
  { label: "Офіс в Одесі", value: "вул. Дерибасівська, 5" },
  { label: "Графік роботи", value: "Щодня, 8:00–22:00" },
];

const socials = ["Instagram", "Telegram", "Facebook"];

export function Footer() {
  return (
    <footer id="footer" className="bg-white px-3 py-10 sm:px-4 sm:py-14 lg:px-6 lg:py-16">
      <div
        className="relative mx-auto flex max-w-container flex-col overflow-hidden rounded-[20px] p-6 sm:rounded-[28px] sm:p-9 lg:rounded-[32px] lg:px-[60px] lg:pb-10 lg:pt-12"
        style={{
          background: "linear-gradient(135deg, #8c4d1a 0%, #29140f 50%, #050508 100%)",
        }}
      >
        {/* decorative grid lines */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {[0.22, 0.44, 0.66, 0.88].map((p) => (
            <span key={p} className="absolute left-0 right-0 h-px bg-white/[0.07]" style={{ top: `${p * 100}%` }} />
          ))}
          {[0.18, 0.38, 0.58, 0.78].map((p) => (
            <span key={p} className="absolute top-0 bottom-0 w-px bg-white/[0.07]" style={{ left: `${p * 100}%` }} />
          ))}
        </div>

        <span className="pointer-events-none absolute -left-6 bottom-8 select-none font-display text-[110px] font-black leading-none text-white/[0.08] sm:text-[180px] lg:bottom-10 lg:text-[230px]">
          PRESTIGE
        </span>

        {/*
          Photo — reproduces Figma's own layering: a container the size of the
          original image frame (942x612), anchored to the card's top-right
          corner and bleeding past its right edge (clipped by the card's own
          overflow-hidden), holding a *genuinely transparent* cutout of the car
          (public/images/footer-car.png, extracted from Figma's raw fill —
          the previously-used flattened export had opaque baked-in corners).
          The card's own gradient shows through around the car exactly as in
          Figma. Sized at 90% of the Figma spec per the requested reduction,
          with the container's top+right offsets left untouched so the
          top-right anchor is preserved while it shrinks from the other corner.
        */}
        <div
          className="pointer-events-none absolute hidden overflow-hidden lg:block"
          style={{ top: "40px", right: "-100px", width: "847.8px", height: "550.8px" }}
        >
          <Image
            src="/images/footer-car.png"
            alt="Преміум авто"
            width={1949}
            height={807}
            className="absolute max-w-none"
            style={{ left: "-23px", top: "42px", width: "1128px", height: "467px" }}
          />
        </div>

        <div className="relative flex flex-1 flex-col">
          <nav className="flex flex-wrap gap-6 sm:justify-end">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  link.active ? "text-amber" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Reveal className="mt-8 flex flex-col gap-8 lg:mt-10 lg:w-[480px]">
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                <span className="text-[13px] font-semibold uppercase text-white/60">Контакти</span>
              </span>
              <h2 className="max-w-[460px] font-display text-2xl font-bold leading-tight text-white sm:text-[28px] lg:text-[34px] lg:leading-[1.22]">
                Готові забронювати авто вже сьогодні
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 sm:max-w-[480px]">
              {contacts.map((c) => (
                <div key={c.label}>
                  <p className="text-xs text-white/50">{c.label}</p>
                  <p className="mt-1 text-base font-semibold text-white">{c.value}</p>
                </div>
              ))}
            </div>

            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit items-center gap-[18px] rounded-pill bg-amber py-[6px] pl-[26px] pr-[6px] font-semibold text-navy transition-transform hover:scale-[1.02]"
            >
              <span>Написати в Telegram</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-dark text-amber transition-transform group-hover:rotate-45">
                ↗
              </span>
            </a>
          </Reveal>
        </div>

        <div className="relative mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/60">© 2026 PRESTIGE. Усі права захищені.</p>
          <div className="flex gap-5">
            {socials.map((s) => (
              <a key={s} href="#" className="text-[13px] text-white/60 transition-colors hover:text-white">
                {s}
              </a>
            ))}
          </div>
        </div>

        <p className="relative mt-4 text-center text-[13px] text-white/60">
          РОЗРОБЛЕНО{" "}
          <a
            href="https://miro-form.com/"
            target="_blank"
            rel="noreferrer"
            className="text-white/60 transition-colors hover:text-amber"
          >
            MIROFORM®
          </a>
        </p>
      </div>
    </footer>
  );
}
