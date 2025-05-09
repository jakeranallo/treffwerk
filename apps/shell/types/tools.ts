import { ToolManifest } from "./index"

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