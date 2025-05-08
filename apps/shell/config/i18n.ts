export type Locale = "en" | "de"

export const defaultLocale: Locale = "en"

export const locales: Locale[] = ["en", "de"]

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
}
