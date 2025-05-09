"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ToolLoader } from "@/components/tool-loader"
import { getUserId } from "@/lib/auth"
import { use } from "react"

export default function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userId = getUserId()
    if (!userId) {
      router.push("/")
    }
  }, [router])

  return <ToolLoader toolId={id} />
}
