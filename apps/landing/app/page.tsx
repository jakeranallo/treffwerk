import { fetchDocumentContent } from "@/lib/api"
import { MarkdownContent } from "@/components/markdown-content"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getFallbackContent } from "@/lib/fallback"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default async function HomePage() {
  const documentId = "9fee684b-810a-4137-b928-e46e45f2c31c"

  let content
  try {
    content = await fetchDocumentContent(documentId)

    if (content.includes("Error")) {
      content = getFallbackContent("homepage")
    }
  } catch (error) {
    content = getFallbackContent("homepage")
  }

  return (
    <article className="max-w-4xl mx-auto">
      <Suspense fallback={<LoadingSpinner />}>
        <MarkdownContent content={content} />
      </Suspense>

      {/* Create Your Key CTA */}
      <div className="mt-8 p-4 md:p-6 rounded-lg bg-muted/50 border border-border">
        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-primary">Ready to get started?</h2>
        <p className="mb-4 md:mb-6 text-sm md:text-base text-muted-foreground">
          Create your key to access the Treffwerk platform and start building with us.
        </p>
        <Link
          href="https://treffwerk.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm md:text-base"
        >
          Create your key <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
