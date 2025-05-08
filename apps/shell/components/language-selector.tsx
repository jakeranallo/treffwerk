"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { locales, localeNames, type Locale } from "@/config/i18n"
import { useI18n } from "@/components/i18n-provider"
import { updateSetting } from "@/lib/settings"

export function LanguageSelector() {
  const [open, setOpen] = useState(false)
  const { locale, setLocale, t } = useI18n()

  const handleSelectLanguage = (value: Locale) => {
    setLocale(value)
    setOpen(false)

    // Update the setting
    updateSetting("language", value)
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">{t("common.language")}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Choose your preferred language</p>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {localeNames[locale]}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={t("common.search")} />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {locales.map((l) => (
                  <CommandItem key={l} value={l} onSelect={() => handleSelectLanguage(l as Locale)}>
                    <Check className={cn("mr-2 h-4 w-4", locale === l ? "opacity-100" : "opacity-0")} />
                    {localeNames[l as Locale]}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
