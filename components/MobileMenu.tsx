"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/nav";
import { ArrowButton } from "@/components/ui/ArrowButton";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        aria-label={open ? "Закрити меню" : "Відкрити меню"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-white/10"
      >
        <span
          className={`h-[1.5px] w-4 bg-white transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
        />
        <span
          className={`h-[1.5px] w-4 bg-white transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-full z-30 mt-3 flex flex-col gap-1 rounded-2xl bg-navy-dark p-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-white/85 hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 px-3">
              <ArrowButton href="#form" variant="light" size="sm">
                Забронювати авто
              </ArrowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
