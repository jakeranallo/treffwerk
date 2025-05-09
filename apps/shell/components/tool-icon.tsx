import { Book, Code, Beaker } from "lucide-react"

interface ToolIconProps {
  icon: string
  className?: string
  size?: number
}

export function ToolIcon({ icon, className = "", size = 24 }: ToolIconProps) {
  // Map tool IDs to their respective icons
  switch (icon) {
    case "trefflesen":
      return <Book className={className} size={size} />;
    case "test-tool":
      return <Beaker className={className} size={size} />;
    default:
      return <Code className={className} size={size} />;
  }
}
