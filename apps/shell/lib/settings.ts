import type { UserSettings } from "@/types"

// Default settings
export const defaultSettings: UserSettings = {
  theme: "system",
  primaryColor: "red",
  language: "en",
}

// Get user settings from localStorage
export function getUserSettings(): UserSettings {
  if (typeof window === "undefined") return defaultSettings

  const settings = localStorage.getItem("treffwerk-settings")
  if (!settings) return defaultSettings

  try {
    return JSON.parse(settings) as UserSettings
  } catch (error) {
    console.error("Failed to parse settings:", error)
    return defaultSettings
  }
}

// Save user settings to localStorage
export function saveUserSettings(settings: UserSettings): void {
  if (typeof window === "undefined") return
  localStorage.setItem("treffwerk-settings", JSON.stringify(settings))
}

// Update specific setting
export function updateSetting<K extends keyof UserSettings>(key: K, value: UserSettings[K]): UserSettings {
  const settings = getUserSettings()
  const updatedSettings = { ...settings, [key]: value }
  saveUserSettings(updatedSettings)
  return updatedSettings
}

// Apply theme setting
export function applyTheme(theme: UserSettings["theme"]): void {
  if (typeof window === "undefined") return

  const root = document.documentElement

  if (theme === "system") {
    root.classList.remove("light", "dark")
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark")
    } else {
      root.classList.add("light")
    }
  } else {
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }
}

// Apply primary color
export function applyPrimaryColor(color: string): void {
  if (typeof window === "undefined") return

  const root = document.documentElement

  // Color HSL values mapping
  const colorMap: Record<string, string> = {
    red: "346 87% 61%",
    pink: "336 80% 58%",
    rose: "330 81% 60%",
    orange: "24 95% 53%",
    amber: "38 92% 50%",
    yellow: "48 96% 53%",
    lime: "85 78% 55%",
    green: "142 71% 45%",
    emerald: "160 84% 39%",
    teal: "173 80% 40%",
    cyan: "186 94% 41%",
    sky: "198 93% 60%",
    blue: "217 91% 60%",
    indigo: "243 75% 59%",
    violet: "262 83% 58%",
    purple: "273 81% 56%",
    fuchsia: "292 84% 61%",
  }

  // Set the CSS variable
  root.style.setProperty("--primary", colorMap[color] || colorMap.red)

  // Update theme-color meta tag for browser UI
  const themeColorMeta = document.querySelector('meta[name="theme-color"]')
  if (themeColorMeta) {
    // Get the hex value for the selected color
    const hexMap: Record<string, string> = {
      red: "#f43f5e",
      pink: "#ec4899",
      rose: "#f43f5e",
      orange: "#f97316",
      amber: "#f59e0b",
      yellow: "#eab308",
      lime: "#84cc16",
      green: "#22c55e",
      emerald: "#10b981",
      teal: "#14b8a6",
      cyan: "#06b6d4",
      sky: "#0ea5e9",
      blue: "#3b82f6",
      indigo: "#6366f1",
      violet: "#8b5cf6",
      purple: "#a855f7",
      fuchsia: "#d946ef",
    }

    themeColorMeta.setAttribute("content", hexMap[color] || hexMap.red)
  }
}
