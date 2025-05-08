import { AppWindow, Activity, Users } from "lucide-react"

interface ToolIconProps {
  icon: string
  className?: string
  size?: number
}

export function ToolIcon({ icon, className = "", size = 24 }: ToolIconProps) {
  // Map tool IDs to their respective icons
  switch (icon) {
    case "heude":
      return <AppWindow className={className} size={size} />
    case "habits":
      return <Activity className={className} size={size} />
    case "demos":
      return <Users className={className} size={size} />
    default:
      return <AppWindow className={className} size={size} />
  }
}
