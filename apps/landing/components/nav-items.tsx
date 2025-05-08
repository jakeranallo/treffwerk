"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function NavItems() {
  const pathname = usePathname()

  const navItems = [
    { href: "/principles", label: "Principles" },
    { href: "/structure", label: "Structure" },
    { href: "/manifesto", label: "Manifesto" },
  ]

  return (
    <ul className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "block transition-colors hover:text-primary",
                isActive
                  ? "text-primary font-medium underline underline-offset-4"
                  : "text-foreground hover:underline hover:underline-offset-4",
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
