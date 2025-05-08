export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Treffwerk",
  description: "Technik für Alle - A privacy-first platform for community-driven tools",
  url: "https://treffwerk.org",
  ogImage: "/og.jpg",
  links: {
    github: "https://github.com/treffwerk/treffwerk-pwa",
  },
}
