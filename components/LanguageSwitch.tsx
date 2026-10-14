import { localeHomePath, otherLocale } from "@/lib/i18n/routing";
import type { Dictionary, Locale } from "@/lib/i18n/types";

/**
 * Link to the same page in the other language. Each locale has its own root
 * layout, so a plain <a> (full navigation) is used intentionally.
 */
export function LanguageSwitch({
  locale,
  t,
  className = "",
  onClick,
}: {
  locale: Locale;
  t: Dictionary["langSwitch"];
  className?: string;
  onClick?: () => void;
}) {
  const target = otherLocale(locale);
  return (
    <a
      href={localeHomePath(target)}
      hrefLang={target}
      lang={target}
      aria-label={t.ariaLabel}
      onClick={onClick}
      className={className}
    >
      {t.label}
    </a>
  );
}
