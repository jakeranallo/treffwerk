"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ToolIcon } from "@/components/tool-icon"
import { getToolById } from "@/lib/tools"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useI18n } from "@/components/i18n-provider"
import { getUserId } from "@/lib/auth"

interface ToolLoaderProps {
  toolId: string
}

// Type to handle any React component props
type AnyReactComponent = React.ComponentType<any>

export function ToolLoader({ toolId }: ToolLoaderProps) {
  const { t } = useI18n()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ToolComponent, setToolComponent] = useState<AnyReactComponent | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const loadTool = async () => {
      try {
        const tool = getToolById(toolId)
        if (!tool) {
          throw new Error(t("tools.error.notFound"))
        }

        // Load the tool's entry point
        let component: AnyReactComponent
        switch (toolId) {
          case "trefflesen":
            const module = await import("@treffwerk/trefflesen/src/Tool")
            component = module.default
            break
          case "test-tool":
            const testModule = await import("@treffwerk/test-tool/src/index")
            component = testModule.default
            break
          // Add other tools here as needed
          default:
            throw new Error(t("tools.error.notFound"))
        }

        if (!component) {
          throw new Error(t("tools.error.loadFailed"))
        }

        setToolComponent(() => component)
        setIsLoading(false)
      } catch (err) {
        console.error("Failed to load tool:", err)
        setError(t("tools.error.loadFailed"))
        setIsLoading(false)
      }
    }

    loadTool()
  }, [toolId, t])

  const handleBack = () => {
    router.push("/dashboard")
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-2">{t("tools.error.title")}</h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    )
  }

  if (!ToolComponent) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-2">{t("tools.error.title")}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t("tools.error.notFound")}</p>
      </div>
    )
  }

  const tool = getToolById(toolId)
  const userId = getUserId()

  // Create a props object that includes the manifest properties and any other common props
  const toolProps = {
    manifest: tool,
    userId: userId || undefined,
  }

  return (
    <div className="flex flex-col h-full">
      <header className="fixed top-0 left-0 right-0 h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 z-10 flex items-center justify-between px-4">
        <Button onClick={handleBack} variant="ghost" size="sm">
          {t("common.back")}
        </Button>
        <div className="flex items-center">
          {ToolComponent && (
            <div className="w-6 h-6 mr-2 bg-slate-700 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <ToolIcon icon={tool?.icon || "code"} className="text-white" size={16} />
            </div>
          )}
          <h1 className="text-lg font-medium text-slate-900 dark:text-slate-100">{tool?.name || toolId}</h1>
        </div>
      </header>

      <div className="flex-1 w-full pt-14 bg-white dark:bg-slate-950">
        <div ref={containerRef} className="h-full w-full">
          <ToolComponent {...toolProps} />
        </div>
      </div>
    </div>
  )
}
