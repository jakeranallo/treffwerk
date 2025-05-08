"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppWindow, Database, Settings, Inbox, LogOut, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ColorThemePicker } from "@/components/color-theme-picker"
import { LanguageSelector } from "@/components/language-selector"
import { Logo } from "@/components/logo"
import { ToolIcon } from "@/components/tool-icon"
import { AddToolsButton } from "@/components/add-tools-button"
import { ToolContextMenu } from "@/components/tool-context-menu"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { getUserId, removeUserId } from "@/lib/auth"
import { getAllTools, getToolById } from "@/lib/tools"
import { getInstalledTools } from "@/lib/installed-tools"
import { messages } from "@/data/messages"
import { useI18n } from "@/components/i18n-provider"
import { format } from "date-fns"

export default function Dashboard() {
  const [isNavigating, setIsNavigating] = useState(false)
  const [activeTab, setActiveTab] = useState("tools")
  const [installedToolIds, setInstalledToolIds] = useState<string[]>([])
  const router = useRouter()
  const { t } = useI18n()
  const allTools = getAllTools()

  // Get installed tools
  const installedTools = installedToolIds
    .map((id) => getToolById(id))
    .filter((tool) => tool !== undefined)
    .map((tool) => tool!)

  // Sort messages by date (newest first)
  const sortedMessages = [...messages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  useEffect(() => {
    // Check if user is logged in
    const userId = getUserId()
    if (!userId) {
      router.push("/")
      return
    }

    // Load installed tools
    setInstalledToolIds(getInstalledTools())

    // Reset navigation state
    setIsNavigating(false)

    return () => {
      setIsNavigating(false)
    }
  }, [router])

  const handleLogout = () => {
    removeUserId()
    router.push("/")
  }

  const openTool = (toolId: string) => {
    // Provide immediate visual feedback
    const button = document.activeElement as HTMLElement
    if (button) {
      button.classList.add("opacity-50")
    }

    // Prevent multiple taps
    if (isNavigating) return
    setIsNavigating(true)

    // Navigate to the tool
    router.push(`/tools/${toolId}`)
  }

  const handleToolUninstall = () => {
    // Refresh the list of installed tools
    setInstalledToolIds(getInstalledTools())
  }

  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM d, yyyy")
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <div className="flex flex-col min-h-screen w-full max-w-md">
        <div className="flex-1 p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsContent value="tools" className="flex-1 mt-0 p-0">
              <div className="flex flex-col items-center mb-2">
                <Logo className="mb-0" />
                <h2 className="text-slate-500 dark:text-slate-400 mt-1">{t("common.tagline")}</h2>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {installedTools.map((tool) => (
                  <ToolContextMenu key={tool.id} toolId={tool.id} onUninstall={handleToolUninstall}>
                    <button
                      className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative w-full"
                      onClick={() => openTool(tool.id)}
                      disabled={isNavigating}
                    >
                      <div className="w-16 h-16 mb-2 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-slate-700 dark:bg-slate-800 rounded-full"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-slate-500/20 dark:from-primary/20 dark:to-slate-700/20 rounded-full"></div>
                        <ToolIcon icon={tool.icon} className="text-white z-10" size={32} />
                        {isNavigating && (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-full z-20">
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-center">{tool.name}</span>
                    </button>
                  </ToolContextMenu>
                ))}

                {/* Add Tools button */}
                <div className="flex flex-col items-center justify-center">
                  <AddToolsButton />
                </div>
              </div>

              {installedTools.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-8">
                  <p className="text-slate-500 dark:text-slate-400 text-center mb-4">
                    {t("dashboard.noToolsInstalled")}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="data" className="flex-1 mt-0 p-0">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-slate-500 dark:text-slate-400 text-center p-6">
                  <Database className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
                  <h3 className="text-xl mb-2">{t("dashboard.data")}</h3>
                  <p>{t("dashboard.dataComingSoon")}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 mt-0 p-0">
              <div className="p-4">
                <h3 className="text-xl mb-6 text-center">{t("dashboard.settings")}</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{t("common.theme")}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{t("dashboard.themeToggle")}</p>
                      </div>
                      <ThemeToggle />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
                    <ColorThemePicker />
                  </div>

                  <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
                    <LanguageSelector />
                  </div>

                  <Button
                    onClick={handleLogout}
                    className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("common.logout")}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inbox" className="flex-1 mt-0 p-0">
              <div className="p-4">
                <h3 className="text-xl mb-6 text-center">{t("dashboard.inbox")}</h3>

                {sortedMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-slate-500 dark:text-slate-400 text-center p-6">
                      <Inbox className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
                      <p>{t("dashboard.inboxEmpty")}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedMessages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`p-4 rounded-lg border ${
                          index === 0 && !message.read
                            ? "bg-primary/10 border-primary/30 dark:bg-primary/20 dark:border-primary/40"
                            : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`font-medium ${index === 0 && !message.read ? "text-primary" : ""}`}>
                            {message.title}
                            {index === 0 && !message.read && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-white">
                                {t("dashboard.new")}
                              </span>
                            )}
                          </h4>
                          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatMessageDate(message.date)}
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{message.content}</p>
                        {message.toolId && (
                          <div className="mt-3 flex items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs flex items-center gap-1"
                              onClick={() => openTool(message.toolId!)}
                            >
                              <ToolIcon icon={message.toolId} className="w-3 h-3" />
                              {allTools.find((t) => t.id === message.toolId)?.name || message.toolId}
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsList className="fixed bottom-0 left-0 right-0 h-16 grid grid-cols-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50">
              <TabsTrigger
                value="tools"
                className="flex flex-col items-center justify-center data-[state=active]:text-primary"
              >
                <AppWindow className="w-5 h-5" />
                <span className="text-xs mt-1">{t("dashboard.tools")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="data"
                className="flex flex-col items-center justify-center data-[state=active]:text-primary"
              >
                <Database className="w-5 h-5" />
                <span className="text-xs mt-1">{t("dashboard.data")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="inbox"
                className="flex flex-col items-center justify-center data-[state=active]:text-primary relative"
              >
                <Inbox className="w-5 h-5" />
                {sortedMessages.some((m) => !m.read) && (
                  <span className="absolute top-1 right-1/4 w-2 h-2 bg-primary rounded-full"></span>
                )}
                <span className="text-xs mt-1">{t("dashboard.inbox")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex flex-col items-center justify-center data-[state=active]:text-primary"
              >
                <Settings className="w-5 h-5" />
                <span className="text-xs mt-1">{t("dashboard.settings")}</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <PWAInstallPrompt />
    </main>
  )
}
