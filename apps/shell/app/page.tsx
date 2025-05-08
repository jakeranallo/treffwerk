"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { getUserId } from "@/lib/auth"
import { getUserSettings, applyTheme, applyPrimaryColor } from "@/lib/settings"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const userId = getUserId()
    if (userId) {
      router.push("/dashboard")
    }

    // Apply saved settings
    const settings = getUserSettings()
    applyTheme(settings.theme)
    applyPrimaryColor(settings.primaryColor)
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-950">
      <LoginForm />
      <PWAInstallPrompt />
    </main>
  )
}
