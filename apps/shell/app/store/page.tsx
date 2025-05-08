"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToolIcon } from "@/components/tool-icon"
import { getAllTools } from "@/lib/tools"
import { getUserId } from "@/lib/auth"
import { useI18n } from "@/components/i18n-provider"

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { t } = useI18n()
  const tools = getAllTools()

  useEffect(() => {
    // Check if user is logged in
    const userId = getUserId()
    if (!userId) {
      router.push("/")
    }
  }, [router])

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleToolClick = (toolId: string) => {
    router.push(`/store/${toolId}`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to dashboard</span>
        </Button>
        <h1 className="text-lg font-medium">{t("store.title")}</h1>
      </header>

      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input
            type="text"
            placeholder={t("store.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="space-y-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className="flex items-start p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-12 h-12 mr-4 bg-slate-700 dark:bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                <ToolIcon icon={tool.icon} className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">{tool.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{tool.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredTools.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400">{t("store.noResults")}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
