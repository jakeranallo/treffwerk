// Key for storing installed tools in localStorage
const INSTALLED_TOOLS_KEY = "treffwerk-installed-tools"

// Get installed tools from localStorage
export function getInstalledTools(): string[] {
  if (typeof window === "undefined") return []

  try {
    const installedTools = localStorage.getItem(INSTALLED_TOOLS_KEY)
    return installedTools ? JSON.parse(installedTools) : []
  } catch (error) {
    console.error("Failed to parse installed tools:", error)
    return []
  }
}

// Check if a tool is installed
export function isToolInstalled(toolId: string): boolean {
  const installedTools = getInstalledTools()
  return installedTools.includes(toolId)
}

// Install a tool
export function installTool(toolId: string): void {
  if (typeof window === "undefined") return

  const installedTools = getInstalledTools()
  if (!installedTools.includes(toolId)) {
    const updatedTools = [...installedTools, toolId]
    localStorage.setItem(INSTALLED_TOOLS_KEY, JSON.stringify(updatedTools))
  }
}

// Uninstall a tool
export function uninstallTool(toolId: string): void {
  if (typeof window === "undefined") return

  const installedTools = getInstalledTools()
  const updatedTools = installedTools.filter((id) => id !== toolId)
  localStorage.setItem(INSTALLED_TOOLS_KEY, JSON.stringify(updatedTools))
}

// Clear tool data (stub implementation)
export function clearToolData(toolId: string): void {
  console.log(`Clearing data for tool: ${toolId}`)
  // In a real implementation, this would clear the tool's data from localStorage
  // For now, we'll just log a message
}
