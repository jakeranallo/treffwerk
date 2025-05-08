"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/components/i18n-provider"
import { Download } from "lucide-react"

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return // App is already installed
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Show the install button
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt")
      } else {
        console.log("User dismissed the install prompt")
      }
      // Clear the deferredPrompt variable
      setDeferredPrompt(null)
      // Hide the install button
      setShowPrompt(false)
    })
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-center z-50 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center gap-4 max-w-md border border-slate-200 dark:border-slate-700">
        <div className="flex-1">
          <h3 className="font-medium text-slate-900 dark:text-slate-100">Install Treffwerk</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Add to your home screen for quick access</p>
        </div>
        <Button onClick={handleInstallClick} className="bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Install
        </Button>
      </div>
    </div>
  )
}
