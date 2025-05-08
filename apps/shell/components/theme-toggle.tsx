"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { updateSetting, applyTheme } from "@/lib/settings"
import { useI18n } from "@/components/i18n-provider"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const { t } = useI18n()

  // Avoid hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true)

    // Get the current theme from settings
    const settings = localStorage.getItem("treffwerk-settings")
    if (settings) {
      try {
        const parsedSettings = JSON.parse(settings)
        if (parsedSettings.theme) {
          setTheme(parsedSettings.theme)
        }
      } catch (error) {
        console.error("Failed to parse settings:", error)
      }
    }
  }, [])

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Apply the theme
    applyTheme(newTheme)

    // Update the setting
    updateSetting("theme", newTheme)
  }

  if (!mounted) {
    return <Button variant="outline" size="icon" className="w-9 h-9" />
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeChange}
      className="w-9 h-9 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">{t("common.theme")}</span>
    </Button>
  )
}
