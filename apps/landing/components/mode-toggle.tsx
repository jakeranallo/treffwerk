"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const [mounted, setMounted] = useState(false)

  // Use the next-themes hook
  const { theme, setTheme } = useTheme()

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to toggle theme directly between light and dark
  const toggleTheme = () => {
    // Use the current theme directly to determine the next theme
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
  }

  // Prevent hydration issues by rendering a placeholder until mounted
  if (!mounted) {
    return (
      <button
        className="w-9 h-9 flex items-center justify-center rounded-md bg-muted"
        aria-label="Toggle theme"
        disabled
      >
        <span className="sr-only">Loading theme</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 flex items-center justify-center rounded-md bg-muted hover:bg-muted/80"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">{theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}</span>
    </button>
  )
}
