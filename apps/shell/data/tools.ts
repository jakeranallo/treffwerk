import type { ToolManifest } from "@/types"

export const tools: ToolManifest[] = [
  {
    id: "trefflesen",
    name: "Trefflesen",
    description: "A tool for reading and managing your content",
    version: "1.0.0",
    icon: "trefflesen",
    entry: "/tools/trefflesen/index.js",
    author: "Jake Ranallo",
    homepage: "https://treffwerk.org/tools/trefflesen",
    languages: ["en"],
    tags: ["reading", "content", "productivity"],
    category: "productivity"
  },
]
