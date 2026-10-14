export type Locale = "uk" | "en";

/** Text split into lines that are joined with <br /> when rendered. */
export type Lines = string[];

export type HeadingSegment =
  | { word: string; amber?: boolean }
  | { image: string; alt: string }
  | { break: true };

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceSlide {
  number: string;
  title: string;
  /** Explicit line breaks for the slide heading; falls back to `title`. */
  titleLines?: Lines;
  subtitle: string;
  description: string;
  /** Explicit line breaks for the description; falls back to `description`. */
  descriptionLines?: Lines;
  tags: string[];
  note: string;
  ctaLabel: string;
  image: string | null;
}

export interface FaqItem {
  question: string;
  answer?: string;
}

export interface ProcessCard {
  number: string;
  icon: string;
  title: string;
  text: string;
  /** Line breaks used at every breakpoint. */
  textLines?: Lines;
  /** Line breaks used on mobile only (sm and up show `text`). */
  mobileTextLines?: Lines;
  featured?: boolean;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  nav: NavLink[];
  langSwitch: {
    /** Short label of the *other* language, shown in the switcher. */
    label: string;
    ariaLabel: string;
  };
  bookCta: string;
  mobileMenu: {
    open: string;
    close: string;
  };
  hero: {
    imageAlt: string;
    badge: string;
    titleLines: Lines;
    description: string;
    reviewsCount: string;
    reviewsLabel: string;
    stats: { value: string; label: string }[];
  };
  about: {
    eyebrow: string;
    stats: { label: string; suffix: string }[];
    heading: HeadingSegment[];
    text: string;
    cta: string;
    cards: { title: string; text: string }[];
  };
  services: {
    eyebrow: string;
    slides: ServiceSlide[];
    photoPlaceholder: string;
    prevSlide: string;
    nextSlide: string;
  };
  advantages: {
    eyebrow: string;
    headingMobile: Lines;
    headingTablet: string;
    headingDesktop: Lines;
    text: string;
    cta: string;
    videoCaption: Lines;
    features: { title: string; text: string; mobileBreakBefore: string }[];
  };
  gallery: {
    eyebrow: string;
    heading: { before: string; accent: string; after: string };
    cta: string;
    bookAriaPrefix: string;
  };
  faq: {
    eyebrow: string;
    heading: HeadingSegment[];
    textMobile: Lines;
    text: string;
    items: FaqItem[];
  };
  process: {
    eyebrow: string;
    heading: HeadingSegment[];
    textMobile: Lines;
    text: string;
    cards: ProcessCard[];
  };
  form: {
    eyebrow: string;
    heading: string;
    textMobile: Lines;
    text: string;
    points: string[];
    fields: {
      name: { label: string; placeholder: string; error: string };
      phone: { label: string; placeholder: string; error: string };
      date: { label: string; placeholder: string; error: string };
    };
    submit: string;
    submitting: string;
    error: string;
    successTitle: string;
    successText: string;
    consent: Lines;
  };
  footer: {
    nav: (NavLink & { active?: boolean })[];
    eyebrow: string;
    heading: string;
    contacts: { label: string; value: string }[];
    telegramCta: string;
    carAlt: string;
    copyright: string;
    developedBy: string;
  };
}
