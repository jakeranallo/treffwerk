# Treffwerk Tool Template

This is a template for creating new tools for the Treffwerk platform. It provides a minimal structure and configuration to get started quickly.

## Structure

```
template/
├── src/
│   └── index.tsx      # Main tool component
├── manifest.json      # Tool metadata and configuration
├── package.json       # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Build configuration
```

## Requirements

### 1. Tool Component (`src/index.tsx`)

The main tool component should:
- Be a default export
- Accept common props (manifest, userId)
- Use React 18+
- Support dark mode via Tailwind classes

Example:
```tsx
import React from 'react';

const Tool: React.FC<{
  manifest: any;
  userId?: string;
}> = ({ manifest, userId }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{manifest.name}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {/* Your tool's content */}
      </div>
    </div>
  );
};

export default Tool;
```

### 2. Manifest (`manifest.json`)

Required fields:
```json
{
  "id": "your-tool-id",        // Unique identifier (used in package name)
  "name": "Your Tool Name",    // Display name
  "description": "...",        // Brief description
  "version": "0.1.0",         // Semantic version
  "icon": "your-icon",        // Icon identifier (used in tool-icon.tsx)
  "entry": "/src/index.tsx",  // Path to main component
  "author": "Your Name",      // Author name
  "homepage": "...",          // Tool's homepage
  "languages": ["en"],        // Supported languages
  "tags": ["tag1", "tag2"],   // Tool categories
  "category": "category"      // Main category
}
```

### 3. Package Configuration (`package.json`)

Required fields:
```json
{
  "name": "@treffwerk/your-tool-id",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}
```

### 4. Build Configuration (`vite.config.ts`)

Required for proper bundling:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'Tool',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
```

## Development

1. Copy this template to create your tool:
   ```bash
   cp -r template your-tool-id
   ```

2. Update the manifest and package.json with your tool's information

3. Install dependencies:
   ```bash
   cd your-tool-id
   pnpm install
   ```

4. Start development:
   ```bash
   pnpm dev
   ```

5. Build for production:
   ```bash
   pnpm build
   ```

## Integration with Shell App

1. Add your tool as a workspace dependency in `apps/shell/package.json`:
   ```json
   {
     "dependencies": {
       "@treffwerk/your-tool-id": "workspace:*"
     }
   }
   ```

2. Add your tool to the tool loader in `apps/shell/components/tool-loader.tsx`:
   ```ts
   const toolImports = {
     "your-tool-id": () => import("@treffwerk/your-tool-id/src/index")
   }
   ```

## Best Practices

1. Use Tailwind CSS for styling
2. Support dark mode with `dark:` variants
3. Keep dependencies minimal
4. Use TypeScript for type safety
5. Follow the shell app's design patterns
6. Handle loading and error states
7. Use the provided props (manifest, userId) appropriately

## Notes

- Tools are loaded dynamically by the shell app
- Each tool should be self-contained
- Avoid modifying the shell app's code
- Keep the bundle size small
- Test in both light and dark modes 