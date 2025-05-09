"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToolIcon } from "@/components/tool-icon"
import { getToolById } from "@/lib/tools"
import { getUserId } from "@/lib/auth"
import { installTool, isToolInstalled } from "@/lib/installed-tools"
import { useI18n } from "@/components/i18n-provider"
import { use } from "react"

export default function ToolDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { id } = resolvedParams
  const [installed, setInstalled] = useState(false)
  const [installing, setInstalling] = useState(false)
  const router = useRouter()
  const { t } = useI18n()
  const tool = getToolById(id)

  useEffect(() => {
    // Check if user is logged in
    const userId = getUserId()
    if (!userId) {
      router.push("/")
      return
    }

    // Check if tool is installed
    setInstalled(isToolInstalled(id))
  }, [id, router])

  const handleBack = () => {
    router.push("/store")
  }

  const handleInstall = () => {
    if (installing) return

    setInstalling(true)

    // Simulate installation process
    setTimeout(() => {
      installTool(id)
      setInstalled(true)
      setInstalling(false)
    }, 1000)
  }

  const handleOpenTool = () => {
    router.push(`/tools/${id}`)
  }

  if (!tool) {
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
            <span className="sr-only">Back to store</span>
          </Button>
          <h1 className="text-lg font-medium">{t("store.toolNotFound")}</h1>
        </header>
      </main>
    )
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
          <span className="sr-only">Back to store</span>
        </Button>
        <h1 className="text-lg font-medium">{tool.name}</h1>
      </header>

      <div className="p-4 pb-20">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 mr-4 bg-slate-700 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <ToolIcon icon={tool.icon} className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-medium">{tool.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{tool.author}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">{t("common.description")}</h3>
            <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">{t("common.version")}</h3>
            <p className="text-slate-600 dark:text-slate-400">{tool.version}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">{t("common.author")}</h3>
            <p className="text-slate-600 dark:text-slate-400">{tool.author}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">{t("common.languages")}</h3>
            <div className="flex flex-wrap gap-2">
              {tool.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-sm text-slate-700 dark:text-slate-300"
                >
                  {lang.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">{t("common.tags")}</h3>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={tool.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-primary"
          >
            <ExternalLink size={14} />
            {t("common.website")}
          </a>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        {installed ? (
          <Button onClick={handleOpenTool} className="w-full bg-primary hover:bg-primary/90">
            {t("tools.openTool")}
          </Button>
        ) : (
          <Button
            onClick={handleInstall}
            className="w-full bg-primary hover:bg-primary/90 flex items-center gap-2"
            disabled={installing}
          >
            {installing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {t("tools.installing")}
              </>
            ) : (
              <>
                <Download size={16} />
                {t("tools.install")}
              </>
            )}
          </Button>
        )}
      </div>
    </main>
  )
}
