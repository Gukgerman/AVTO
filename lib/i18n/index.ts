import type { Metadata } from "next";
import type { Dictionary, Locale } from "./types";
import { uk } from "./uk";
import { en } from "./en";
import { defaultLocale, localeHomePath, locales } from "./routing";

export type { Dictionary, Locale } from "./types";
export { locales, defaultLocale, localeHomePath, otherLocale } from "./routing";

const dictionaries: Record<Locale, Dictionary> = { uk, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Absolute site origin for canonical / hreflang / Open Graph URLs.
 * Set NEXT_PUBLIC_SITE_URL in production; Vercel's production domain is used
 * as a fallback so links are never left pointing at localhost there.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale);
  const path = localeHomePath(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: {
        uk: localeHomePath("uk"),
        en: localeHomePath("en"),
        "x-default": localeHomePath(defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      siteName: "PRESTIGE",
      title: meta.title,
      description: meta.description,
      url: path,
      locale: meta.ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => getDictionary(l).meta.ogLocale),
    },
  };
}
