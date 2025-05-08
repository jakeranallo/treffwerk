"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground">We encountered an error while loading the content.</p>
      <div className="flex space-x-4">
        <button onClick={() => reset()} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Try again
        </button>
        <Link href="/" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
          Go home
        </Link>
      </div>
    </div>
  )
}
