import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <h2 className="text-2xl font-bold">Page not found</h2>
      <p className="text-muted-foreground">The page you are looking for doesn't exist.</p>
      <Link href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Go home
      </Link>
    </div>
  )
}
