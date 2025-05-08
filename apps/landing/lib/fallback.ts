export function getFallbackContent(pageName: string): string {
  switch (pageName) {
    case "homepage":
      return `
## Welcome to Treffwerk

We are a not-for-profit tech collective focused on building useful things.

This site is currently running in fallback mode due to an issue connecting to the API. Please check the debug page for more information.
`
    case "principles":
      return `
## Our Principles

These are the principles that guide our work:

### Open Source
We believe in transparency and collaboration. All our code is open source and available for anyone to use, modify, and contribute to.

### Collaboration
We work together across disciplines and backgrounds to create better solutions. We value diverse perspectives and inclusive practices.

### Transparency
We operate with full transparency in our decision-making processes and financial operations. We believe in accountability to our community.

### Accessibility
We design and build with accessibility in mind, ensuring our tools and platforms can be used by everyone regardless of ability.

### Privacy by Design
We respect user privacy and build systems that minimize data collection and maximize user control over their information.
`
    case "structure":
      return `
## Structure

We are a flat organization with no formal hierarchy.
`
    case "manifesto":
      return `
## Manifesto

We believe in the power of technology to create positive change.
`
    default:
      return "Fallback content. Please check the API connection."
  }
}
