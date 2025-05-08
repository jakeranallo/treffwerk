import { fetchDocumentContent } from "@/lib/api"
import { MarkdownContent } from "@/components/markdown-content"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getFallbackContent } from "@/lib/fallback"

export default async function ManifestoPage() {
  const documentId = "bfd29008-194a-4a6e-84c4-b0af341a98cd"

  let content
  try {
    content = await fetchDocumentContent(documentId)

    if (content.includes("Error")) {
      content = getFallbackContent("manifesto")
    }
  } catch (error) {
    content = getFallbackContent("manifesto")
  }

  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 md:mb-6 tracking-tight text-primary">
        Manifesto
      </h1>
      <Suspense fallback={<LoadingSpinner />}>
        <MarkdownContent content={content} />
      </Suspense>
    </article>
  )
}
