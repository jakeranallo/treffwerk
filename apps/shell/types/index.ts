// Tool manifest type definition
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

// User settings type
export interface UserSettings {
  theme: "light" | "dark" | "system"
  primaryColor: string
  language: "en" | "de"
}

// Message type for inbox
export interface Message {
  id: string
  title: string
  content: string
  date: string
  read: boolean
  toolId?: string
}
