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
  {
    id: "test-tool",
    name: "Test Tool",
    description: "A test tool created from the template to verify tool loading",
    version: "0.1.0",
    icon: "test-tool",
    entry: "/tools/test-tool/index.js",
    author: "Test Author",
    homepage: "https://treffwerk.org/tools/test-tool",
    languages: ["en"],
    tags: ["test", "template"],
    category: "development"
  }
]
