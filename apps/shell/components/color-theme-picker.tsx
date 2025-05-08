"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { updateSetting, applyPrimaryColor } from "@/lib/settings"
import { useI18n } from "@/components/i18n-provider"

// Define the available colors from the shadcn palette with their hex values
const colorOptions = [
  { name: "Red", value: "red", class: "bg-red-500", hex: "#f43f5e" },
  { name: "Pink", value: "pink", class: "bg-pink-500", hex: "#ec4899" },
  { name: "Rose", value: "rose", class: "bg-rose-500", hex: "#f43f5e" },
  { name: "Orange", value: "orange", class: "bg-orange-500", hex: "#f97316" },
  { name: "Amber", value: "amber", class: "bg-amber-500", hex: "#f59e0b" },
  { name: "Yellow", value: "yellow", class: "bg-yellow-500", hex: "#eab308" },
  { name: "Lime", value: "lime", class: "bg-lime-500", hex: "#84cc16" },
  { name: "Green", value: "green", class: "bg-green-500", hex: "#22c55e" },
  { name: "Emerald", value: "emerald", class: "bg-emerald-500", hex: "#10b981" },
  { name: "Teal", value: "teal", class: "bg-teal-500", hex: "#14b8a6" },
  { name: "Cyan", value: "cyan", class: "bg-cyan-500", hex: "#06b6d4" },
  { name: "Sky", value: "sky", class: "bg-sky-500", hex: "#0ea5e9" },
  { name: "Blue", value: "blue", class: "bg-blue-500", hex: "#3b82f6" },
  { name: "Indigo", value: "indigo", class: "bg-indigo-500", hex: "#6366f1" },
  { name: "Violet", value: "violet", class: "bg-violet-500", hex: "#8b5cf6" },
  { name: "Purple", value: "purple", class: "bg-purple-500", hex: "#a855f7" },
  { name: "Fuchsia", value: "fuchsia", class: "bg-fuchsia-500", hex: "#d946ef" },
]

export function ColorThemePicker() {
  const [selectedColor, setSelectedColor] = useState("red")
  const [isSaving, setIsSaving] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    // Load saved color preference from settings
    const settings = localStorage.getItem("treffwerk-settings")
    if (settings) {
      try {
        const parsedSettings = JSON.parse(settings)
        if (parsedSettings.primaryColor) {
          setSelectedColor(parsedSettings.primaryColor)
          applyPrimaryColor(parsedSettings.primaryColor)
        }
      } catch (error) {
        console.error("Failed to parse settings:", error)
      }
    }
  }, [])

  const handleColorChange = (value: string) => {
    setSelectedColor(value)
    setIsSaving(true)

    // Apply the color theme
    applyPrimaryColor(value)

    // Update the setting
    updateSetting("primaryColor", value)

    // Simulate saving to server
    setTimeout(() => {
      setIsSaving(false)
    }, 500)
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">{t("common.color")}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t("dashboard.primaryColor")}</p>
      </div>

      <RadioGroup value={selectedColor} onValueChange={handleColorChange} className="grid grid-cols-4 gap-2">
        {colorOptions.map((color) => (
          <div key={color.value} className="flex items-center space-x-2">
            <RadioGroupItem value={color.value} id={`color-${color.value}`} className="sr-only" />
            <Label
              htmlFor={`color-${color.value}`}
              className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${color.class} hover:ring-2 hover:ring-offset-2 ${selectedColor === color.value ? "ring-2 ring-offset-2 ring-slate-950 dark:ring-slate-50" : ""}`}
            >
              {selectedColor === color.value && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {isSaving && <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{t("dashboard.syncingSettings")}</p>}
    </div>
  )
}
