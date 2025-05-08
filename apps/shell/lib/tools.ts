import type { ToolManifest } from "@/types"
import { tools } from "@/data/tools"

// Get all tools
export function getAllTools(): ToolManifest[] {
  return tools
}

// Get a tool by ID
export function getToolById(id: string): ToolManifest | undefined {
  return tools.find((tool) => tool.id === id)
}

// Get user granted permissions for a tool
export function getToolPermissions(toolId: string): ToolPermission[] {
  if (typeof window === "undefined") return []

  const permissionsKey = `treffwerk-permissions-${toolId}`
  const storedPermissions = localStorage.getItem(permissionsKey)

  if (!storedPermissions) return []

  try {
    return JSON.parse(storedPermissions) as ToolPermission[]
  } catch (error) {
    console.error("Failed to parse tool permissions:", error)
    return []
  }
}

// Grant permission for a tool
export function grantToolPermission(toolId: string, permission: ToolPermission): void {
  if (typeof window === "undefined") return

  const permissionsKey = `treffwerk-permissions-${toolId}`
  const currentPermissions = getToolPermissions(toolId)

  // Check if permission already exists
  if (!currentPermissions.some((p) => p.type === permission.type)) {
    const updatedPermissions = [...currentPermissions, permission]
    localStorage.setItem(permissionsKey, JSON.stringify(updatedPermissions))
  }
}

// Revoke permission for a tool
export function revokeToolPermission(toolId: string, permissionType: string): void {
  if (typeof window === "undefined") return

  const permissionsKey = `treffwerk-permissions-${toolId}`
  const currentPermissions = getToolPermissions(toolId)

  const updatedPermissions = currentPermissions.filter((p) => p.type !== permissionType)
  localStorage.setItem(permissionsKey, JSON.stringify(updatedPermissions))
}

// Check if a tool has a specific permission
export function hasToolPermission(toolId: string, permissionType: string): boolean {
  const permissions = getToolPermissions(toolId)
  return permissions.some((p) => p.type === permissionType)
}

// Load a tool (placeholder implementation)
export async function loadTool(toolId: string): Promise<any> {
  const tool = getToolById(toolId)
  if (!tool) {
    throw new Error(`Tool not found: ${toolId}`)
  }

  // In a real implementation, this would dynamically load the tool's code
  // For now, we'll just return the tool manifest
  return {
    manifest: tool,
    // This would be the actual tool module in a real implementation
    module: {
      mount: (element: HTMLElement) => {
        element.innerHTML = `<div class="p-4"><h1 class="text-xl font-bold">${tool.name}</h1><p>${tool.description}</p></div>`
      },
      unmount: (element: HTMLElement) => {
        element.innerHTML = ""
      },
    },
  }
}
