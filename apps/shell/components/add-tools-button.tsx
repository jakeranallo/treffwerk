"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/components/i18n-provider"

export function AddToolsButton() {
  const router = useRouter()
  const { t } = useI18n()

  const handleClick = () => {
    router.push("/store")
  }

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative w-full h-full min-h-[120px]"
    >
      <div className="w-16 h-16 mb-2 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        <Plus className="w-8 h-8 text-slate-500 dark:text-slate-300 z-10" />
      </div>
      <span className="text-sm text-center text-slate-700 dark:text-slate-300">{t("tools.addTools")}</span>
    </button>
  )
}
