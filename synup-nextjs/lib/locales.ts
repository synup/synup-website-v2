/**
 * Locale metadata for the Synup multilingual site.
 *
 * Used by:
 * - Locale switcher component (header)
 * - hreflang tag generation
 * - next-intl routing
 *
 * Supported locales: en, de, fr, es
 * Default locale: en (served at / without prefix; canonical uses /en/)
 */

import type { Locale } from "./content";

// ---------------------------------------------------------------------------
// Locale metadata
// ---------------------------------------------------------------------------

export interface LocaleMeta {
  /** BCP 47 language code */
  code: Locale;
  /** hreflang attribute value */
  hreflang: string;
  /** Display label for locale switcher */
  label: string;
  /** Native language name */
  nativeLabel: string;
  /** Flag emoji */
  flag: string;
  /** URL prefix (empty string for default locale) */
  urlPrefix: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: {
    code: "en",
    hreflang: "en",
    label: "English",
    nativeLabel: "English",
    flag: "🇺🇸",
    urlPrefix: "",
  },
  de: {
    code: "de",
    hreflang: "de",
    label: "German",
    nativeLabel: "Deutsch",
    flag: "🇩🇪",
    urlPrefix: "/de",
  },
  fr: {
    code: "fr",
    hreflang: "fr",
    label: "French",
    nativeLabel: "Français",
    flag: "🇫🇷",
    urlPrefix: "/fr",
  },
  es: {
    code: "es",
    hreflang: "es",
    label: "Spanish",
    nativeLabel: "Español",
    flag: "🇪🇸",
    urlPrefix: "/es",
  },
};

/** Ordered list of all supported locales (EN first) */
export const ALL_LOCALES: Locale[] = ["en", "de", "fr", "es"];

/** The default locale — served without URL prefix */
export const DEFAULT_LOCALE: Locale = "en";

// ---------------------------------------------------------------------------
// URL transformation helpers
// ---------------------------------------------------------------------------

/**
 * Given a current URL pathname and target locale, return the equivalent
 * pathname in the target locale.
 *
 * Examples:
 *   transformLocaleUrl("/integrations/google", "de") → "/de/integrations/google"
 *   transformLocaleUrl("/de/integrations/google", "en") → "/integrations/google"
 *   transformLocaleUrl("/fr/integrations/google", "es") → "/es/integrations/google"
 *
 * @param pathname  Current URL pathname (e.g. "/de/integrations/google")
 * @param targetLocale  The locale to switch to
 * @returns  Pathname for the target locale
 */
export function transformLocaleUrl(
  pathname: string,
  targetLocale: Locale
): string {
  // Strip any existing locale prefix
  const strippedPath = stripLocalePrefix(pathname);

  // Add target locale prefix (empty for EN)
  const targetPrefix = LOCALE_META[targetLocale].urlPrefix;
  return `${targetPrefix}${strippedPath}`;
}

/**
 * Strip a locale prefix from a URL pathname.
 *
 * "/de/integrations/google" → "/integrations/google"
 * "/integrations/google"    → "/integrations/google"
 */
export function stripLocalePrefix(pathname: string): string {
  for (const locale of ALL_LOCALES) {
    const prefix = LOCALE_META[locale].urlPrefix;
    if (prefix && pathname.startsWith(prefix + "/")) {
      return pathname.slice(prefix.length);
    }
    // Handle exact match (e.g. "/de" with no trailing path)
    if (prefix && pathname === prefix) {
      return "/";
    }
  }
  return pathname;
}

/**
 * Detect the locale from a URL pathname.
 *
 * "/de/integrations/google" → "de"
 * "/integrations/google"    → "en"
 * "/fr/"                    → "fr"
 */
export function detectLocaleFromPath(pathname: string): Locale {
  for (const locale of ALL_LOCALES) {
    const prefix = LOCALE_META[locale].urlPrefix;
    if (prefix && (pathname.startsWith(prefix + "/") || pathname === prefix)) {
      return locale;
    }
  }
  return DEFAULT_LOCALE;
}

/**
 * Build an absolute URL for a page in a given locale.
 *
 * @param slug       Page slug (e.g. "integrations/google")
 * @param locale     Target locale
 * @param baseUrl    Base URL (defaults to Synup production domain)
 */
export function buildLocaleUrl(
  slug: string,
  locale: Locale,
  baseUrl: string = "https://www.synup.com"
): string {
  const prefix = LOCALE_META[locale].urlPrefix;
  // Ensure slug starts with /
  const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;
  return `${baseUrl}${prefix}${normalizedSlug}`;
}

/**
 * Build all hreflang URLs for a given slug across all locales.
 *
 * Returns an array of { locale, hreflang, href } objects for use in
 * page <head> metadata generation.
 */
export function buildAllHrefLangs(
  slug: string,
  baseUrl: string = "https://www.synup.com"
): Array<{ locale: Locale; hreflang: string; href: string }> {
  return ALL_LOCALES.map((locale) => ({
    locale,
    hreflang: LOCALE_META[locale].hreflang,
    href: buildLocaleUrl(slug, locale, baseUrl),
  }));
}

/**
 * Get locale metadata for the locale switcher component.
 *
 * Returns all locales with their display info and the URL to switch to
 * from the current page path.
 */
export function getLocaleSwitcherData(currentPathname: string): Array<{
  meta: LocaleMeta;
  switchUrl: string;
  isActive: boolean;
}> {
  const currentLocale = detectLocaleFromPath(currentPathname);

  return ALL_LOCALES.map((locale) => ({
    meta: LOCALE_META[locale],
    switchUrl: transformLocaleUrl(currentPathname, locale),
    isActive: locale === currentLocale,
  }));
}
