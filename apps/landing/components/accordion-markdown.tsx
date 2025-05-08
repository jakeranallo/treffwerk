"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface AccordionMarkdownProps {
  content: string
}

export function AccordionMarkdown({ content }: AccordionMarkdownProps) {
  const [sections, setSections] = useState<{ title: string; content: string }[]>([])
  const [introContent, setIntroContent] = useState<string>("")

  // Parse the markdown to extract H3 sections
  useEffect(() => {
    // Split the content by H3 headings
    const h3Regex = /^### (.+)$/gm
    const parts = content.split(h3Regex)

    // If parts[0] exists and doesn't start with ###, it's intro content
    if (parts[0] && !parts[0].trim().startsWith("###")) {
      setIntroContent(parts[0].trim())
    }

    // Process the remaining parts into title-content pairs
    const extractedSections = []
    for (let i = 1; i < parts.length; i += 2) {
      if (parts[i] && parts[i + 1]) {
        extractedSections.push({
          title: parts[i].trim(),
          content: parts[i + 1].trim(),
        })
      }
    }

    setSections(extractedSections)
  }, [content])

  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
      {/* Render intro content if any */}
      {introContent && (
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {introContent}
        </ReactMarkdown>
      )}

      {/* Render each H3 section as an accordion */}
      <Accordion type="multiple" className="mt-6">
        {sections.map((section, index) => (
          <AccordionItem key={index} value={`section-${index}`} className="border-b border-border">
            <AccordionTrigger className="text-lg font-semibold py-4 hover:text-primary">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 pb-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {section.content}
                </ReactMarkdown>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
