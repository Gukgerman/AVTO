import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MotionProvider } from "@/components/MotionProvider";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRESTIGE — Оренда преміум авто в Одесі",
  description:
    "Mercedes, BMW, Porsche та інші авто преміум-класу в оренду в Одесі — швидка подача, без застав і посередників.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${unbounded.variable} font-sans antialiased`}>
        <MotionProvider>
          <Preloader />
          <SmoothScroll />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
