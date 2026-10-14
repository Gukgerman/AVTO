import type { Locale } from "./types";

export const locales: Locale[] = ["uk", "en"];
export const defaultLocale: Locale = "uk";

/** Home route of a locale: "/" for the default language, "/en" for English. */
export function localeHomePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

/** The locale the language switcher points to. */
export function otherLocale(locale: Locale): Locale {
  return locale === "uk" ? "en" : "uk";
}
