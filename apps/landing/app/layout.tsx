import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { NavItems } from "@/components/nav-items"
import { LogIn } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Treffwerk",
  description: "A not-for-profit tech collective",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col bg-background">
            <header className="border-b">
              <div className="container mx-auto px-4 py-6">
                {/* Mobile-first layout - stacked vertically */}
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">
                      TREFFWERK
                    </Link>
                    <div className="flex items-center space-x-2">
                      {/* Sign in button - using same link as Create Key */}
                      <Link
                        href="https://treffwerk.vercel.app"
                        className="flex items-center justify-center h-9 px-3 rounded-md bg-muted hover:bg-muted/80 text-sm font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LogIn className="h-4 w-4 mr-1" />
                        <span>Sign in</span>
                      </Link>
                      <ModeToggle />
                    </div>
                  </div>

                  {/* Navigation - full width on mobile, horizontal on desktop */}
                  <nav className="w-full py-2 px-4 rounded-md bg-muted/50">
                    <NavItems />
                  </nav>
                </div>
              </div>
            </header>
            <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
            <footer className="border-t">
              <div className="container mx-auto px-4 py-6">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Treffwerk. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
