import * as React from 'react'

/**
 * Tool manifest type definition
 */
export interface ToolManifest {
  id: string
  name: string
  description: string
  version: string
  icon: string
  entry: string
  author: string
  homepage: string
  languages: string[]
  tags: string[]
  category: string
}

/**
 * Base props that all tool components should accept
 */
export interface ToolComponentProps {
  // Common props that might be passed to all tools
  manifest?: ToolManifest
  userId?: string
}

/**
 * Type for a tool component
 * This ensures all tool components follow the same interface
 */
export type ToolComponent = React.ComponentType<ToolComponentProps>

/**
 * Type for the tool component registry
 * Maps tool IDs to their component implementations
 */
export interface ToolComponentRegistry {
  [key: string]: ToolComponent
}

export interface ToolProps {
  id: string;
  name: string;
  description: string;
  version: string;
  icon: string;
  author: string;
  homepage: string;
  languages: string[];
  tags: string[];
  category: string;
  license: string;
} 