import React from 'react'
import { createRoot } from 'react-dom/client'
import { Tool } from '@treffwerk/ui'

interface ToolProps {
  settings: Record<string, any>
  onSettingsChange: (settings: Record<string, any>) => void
}

const TemplateTool: React.FC<ToolProps> = ({ settings, onSettingsChange }) => {
  return (
    <Tool>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Template Tool</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This is a template tool. Replace this content with your tool's implementation.
        </p>
      </div>
    </Tool>
  )
}

// Mount function that will be called by the shell
export function mount(element: HTMLElement, props: ToolProps) {
  const root = createRoot(element)
  root.render(<TemplateTool {...props} />)
}

// Unmount function for cleanup
export function unmount(element: HTMLElement) {
  const root = element._reactRootContainer
  if (root) {
    root.unmount()
  }
} 