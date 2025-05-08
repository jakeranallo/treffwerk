"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Log when theme changes for debugging
  const onThemeChange = (theme: string | undefined) => {
    console.log(`Theme changed to: ${theme}`)
  }

  return (
    <NextThemesProvider onThemeChange={onThemeChange} {...props}>
      {children}
    </NextThemesProvider>
  )
}
