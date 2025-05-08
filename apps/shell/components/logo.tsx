"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export function Logo({ width = 154, height = 88, className = "" }: LogoProps) {
  const [colorFilter, setColorFilter] = useState("")

  useEffect(() => {
    // Load saved color preference from settings
    const settings = localStorage.getItem("treffwerk-settings")
    if (settings) {
      try {
        const parsedSettings = JSON.parse(settings)
        if (parsedSettings.primaryColor) {
          updateLogoFilter(parsedSettings.primaryColor)
        }
      } catch (error) {
        console.error("Failed to parse settings:", error)
      }
    }

    // Listen for settings changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "treffwerk-settings") {
        try {
          const newSettings = JSON.parse(e.newValue || "{}")
          if (newSettings.primaryColor) {
            updateLogoFilter(newSettings.primaryColor)
          }
        } catch (error) {
          console.error("Failed to parse settings:", error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const updateLogoFilter = (color: string) => {
    // Different filter values for different colors
    // These are approximations and may need adjustment
    const filterMap: Record<string, string> = {
      red: "", // Default, no filter needed
      pink: "hue-rotate(-15deg) saturate(1.2)",
      rose: "hue-rotate(-10deg) saturate(1.1)",
      orange: "hue-rotate(25deg) saturate(1.5)",
      amber: "hue-rotate(35deg) saturate(1.5)",
      yellow: "hue-rotate(45deg) saturate(1.5)",
      lime: "hue-rotate(70deg) saturate(1.2)",
      green: "hue-rotate(100deg) saturate(1.2)",
      emerald: "hue-rotate(130deg) saturate(1.2)",
      teal: "hue-rotate(150deg) saturate(1.2)",
      cyan: "hue-rotate(170deg) saturate(1.2)",
      sky: "hue-rotate(190deg) saturate(1.2)",
      blue: "hue-rotate(210deg) saturate(1.2)",
      indigo: "hue-rotate(230deg) saturate(1.2)",
      violet: "hue-rotate(250deg) saturate(1.2)",
      purple: "hue-rotate(270deg) saturate(1.2)",
      fuchsia: "hue-rotate(290deg) saturate(1.2)",
    }

    setColorFilter(filterMap[color] || "")
  }

  return (
    <div className={`inline-flex ${className}`} style={{ width, height, lineHeight: 0 }}>
      <Image
        src="/logo.svg"
        alt="Treffwerk Logo"
        width={width}
        height={height}
        priority
        className="object-contain"
        style={{ filter: colorFilter }}
      />
    </div>
  )
}
