"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface AppHeaderProps {
  appName: string
}

export function AppHeader({ appName }: AppHeaderProps) {
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/dashboard")}
        className="mr-4 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Back to dashboard</span>
      </Button>
      <h1 className="text-lg font-medium text-slate-900 dark:text-slate-100">{appName}</h1>
    </header>
  )
}
