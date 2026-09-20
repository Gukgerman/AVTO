"use client";

import { useState, type FormEvent } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { submitBooking } from "@/lib/submit-booking";
import { ArrowUpRightIcon } from "@/components/ui/icons";

const points = ["Безкоштовна консультація", "Фіксована вартість оренди", "Жодних прихованих застав"];

interface Errors {
  name?: string;
  phone?: string;
  date?: string;
}

export function CtaForm() {
  const [values, setValues] = useState({ name: "", phone: "", date: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(): boolean {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Вкажіть ім’я та прізвище";
    if (!/^\+?\d[\d\s()-]{7,}$/.test(values.phone.trim())) next.phone = "Перевірте номер телефону";
    if (!values.date.trim()) next.date = "Оберіть дату початку оренди";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await submitBooking(values);
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="form" className="bg-white px-3 py-10 sm:px-4 sm:py-14 lg:px-6 lg:py-16">
      <div className="relative mx-auto max-w-container overflow-hidden rounded-[20px] sm:rounded-[28px] lg:rounded-[32px]">
        <video
          src="/video/cta-form-mobile.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 block h-full w-full object-cover lg:hidden"
          style={{ objectPosition: "50% 71%" }}
        />
        <video
          src="/video/cta-form-desktop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 hidden h-full w-full object-cover lg:block"
          style={{ objectPosition: "50% 71%" }}
        />
        <div className="absolute inset-0 bg-navy-dark/70" />

        <div className="relative flex flex-col gap-10 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:p-16">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow tone="light">ЗАБРОНЮВАТИ АВТО</Eyebrow>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl lg:max-w-[840px] lg:text-[48px] lg:leading-[1.22]">
              Забронюйте преміум авто вже сьогодні
            </h2>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base lg:max-w-[355px]">
              <span className="sm:hidden">
                Залиште контакти — підберемо авто під вашу подію і зафіксуємо
                <br />
                ціну без доплат.
              </span>
              <span className="hidden sm:inline">
                Залиште контакти — підберемо авто під вашу подію і зафіксуємо ціну без доплат
              </span>
            </p>
            <ul className="flex flex-col gap-2.5 lg:max-w-[460px]">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[15px] text-white/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber text-[11px] font-bold text-navy">
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="w-full rounded-2xl border border-white/25 bg-white/[0.12] p-6 backdrop-blur-md sm:p-8 lg:w-[400px] lg:shrink-0">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-xl font-bold text-navy">
                  ✓
                </span>
                <p className="text-lg font-semibold text-white">Дякуємо! Заявку прийнято.</p>
                <p className="text-sm text-white/65">Ми зв&rsquo;яжемося з вами найближчим часом.</p>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Field
                  label="Ім’я та прізвище"
                  placeholder="Іван Петренко"
                  value={values.name}
                  error={errors.name}
                  onChange={(v) => setValues((s) => ({ ...s, name: v }))}
                />
                <Field
                  label="Номер телефону"
                  placeholder="+380"
                  type="tel"
                  value={values.phone}
                  error={errors.phone}
                  onChange={(v) => setValues((s) => ({ ...s, phone: v }))}
                />
                <Field
                  label="Дата початку оренди"
                  placeholder="Наприклад, 25.09.2026"
                  value={values.date}
                  error={errors.date}
                  onChange={(v) => setValues((s) => ({ ...s, date: v }))}
                />

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group mt-1 inline-flex items-center justify-between gap-[18px] rounded-pill bg-amber py-[6px] pl-[26px] pr-[6px] font-semibold text-navy transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  <span>{status === "submitting" ? "Надсилаємо…" : "Забронювати авто"}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-dark text-amber transition-transform group-hover:rotate-45">
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </span>
                </button>

                {status === "error" && (
                  <p className="text-xs text-red-200">
                    Щось пішло не так. Спробуйте ще раз або зателефонуйте нам.
                  </p>
                )}

                <p className="text-[11px] leading-relaxed text-white/50">
                  Натискаючи кнопку, ви погоджуєтесь
                  <br />
                  з політикою конфіденційності.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  value,
  error,
  type = "text",
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-semibold text-white">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-[10px] border bg-white/[0.08] px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-amber ${
          error ? "border-red-300" : "border-white/25"
        }`}
      />
      {error && <span className="text-xs text-red-200">{error}</span>}
    </label>
  );
}
