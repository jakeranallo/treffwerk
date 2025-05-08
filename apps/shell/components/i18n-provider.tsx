"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type Locale, defaultLocale } from "@/config/i18n"
import { getUserSettings } from "@/lib/settings"

// Import translations
import enTranslations from "@/i18n/en.json"
import deTranslations from "@/i18n/de.json"

const translations = {
  en: enTranslations,
  de: deTranslations,
}

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (key) => key,
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    // Get user's preferred language from settings
    const settings = getUserSettings()
    if (settings.language) {
      setLocale(settings.language)
    }
  }, [])

  const t = (key: string) => {
    // Split the key by dots to access nested properties
    const keys = key.split(".")

    // Get the translation object for the current locale
    let translation: any = translations[locale]

    // Navigate through the nested properties
    for (const k of keys) {
      if (!translation || !translation[k]) {
        // Fallback to English if translation is missing
        translation = translations[defaultLocale]
        for (const fallbackKey of keys) {
          if (!translation || !translation[fallbackKey]) {
            return key // Return the key if translation is missing in fallback
          }
          translation = translation[fallbackKey]
        }
        return translation
      }
      translation = translation[k]
    }

    return translation
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
