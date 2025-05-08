"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ToolLoader } from "@/components/tool-loader"
import { getUserId } from "@/lib/auth"

export default function ToolPage({ params }: { params: { id: string } }) {
  const { id } = params
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
