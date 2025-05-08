import { fetchDocumentContent } from "@/lib/api"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getFallbackContent } from "@/lib/fallback"
import { AccordionMarkdown } from "@/components/accordion-markdown"

export default async function PrinciplesPage() {
  const documentId = "0aee6f62-838a-4dbf-94dd-c03b15a8d254"

  let content
  try {
    content = await fetchDocumentContent(documentId)

    if (content.includes("Error")) {
      content = getFallbackContent("principles")
    }
  } catch (error) {
    content = getFallbackContent("principles")
  }

  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 md:mb-6 tracking-tight text-primary">
        Principles
      </h1>
      <Suspense fallback={<LoadingSpinner />}>
        <AccordionMarkdown content={content} />
      </Suspense>
    </article>
  )
}
