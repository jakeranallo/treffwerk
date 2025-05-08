# Treffwerk Monorepo

This monorepo contains the Treffwerk applications and tools, managed with Turborepo and pnpm.

## Structure

- `apps/shell` - Main Treffwerk application (app.treffwerk.com)
- `apps/landing` - Treffwerk landing page (treffwerk.com)
- `packages/ui` - Shared UI components
- `apps/*` - Community-contributed tools (as Git submodules)

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start development servers:
```bash
pnpm dev
```

## Adding a New Tool as a Submodule

To add a new tool as a Git submodule:

1. Add the submodule:
```bash
git submodule add <repository-url> apps/<tool-name>
```

2. Install dependencies:
```bash
pnpm install
```

3. The tool will be automatically included in the Turborepo workspace and can be run with:
```bash
pnpm turbo run dev
```

## Development

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm lint` - Run linting for all packages 