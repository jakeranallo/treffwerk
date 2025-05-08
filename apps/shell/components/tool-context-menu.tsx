"use client"

import type React from "react"

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Trash2, Database } from "lucide-react"
import { uninstallTool, clearToolData } from "@/lib/installed-tools"
import { useI18n } from "@/components/i18n-provider"

interface ToolContextMenuProps {
  toolId: string
  children: React.ReactNode
  onUninstall: () => void
}

export function ToolContextMenu({ toolId, children, onUninstall }: ToolContextMenuProps) {
  const { t } = useI18n()

  const handleUninstall = () => {
    uninstallTool(toolId)
    onUninstall()
  }

  const handleClearData = () => {
    clearToolData(toolId)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={handleClearData} className="flex items-center gap-2 cursor-pointer">
          <Database className="w-4 h-4" />
          <span>{t("tools.clearData")}</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleUninstall} className="flex items-center gap-2 text-red-500 cursor-pointer">
          <Trash2 className="w-4 h-4" />
          <span>{t("tools.uninstall")}</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
