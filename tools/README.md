# Treffwerk Tools

This directory contains all the tools available in the Treffwerk platform. Tools can be either official (maintained by Treffwerk) or community-contributed.

## Tool Structure

Each tool should follow this structure:

```
tool-name/
├── manifest.json     # Tool manifest (required)
├── src/             # Source code
├── public/          # Static assets
├── screenshots/     # Tool screenshots
└── README.md        # Tool documentation
```

## Creating a New Tool

1. Copy the `template` directory as a starting point
2. Update the `manifest.json` with your tool's information
3. Implement your tool's functionality in the `src` directory
4. Add screenshots to the `screenshots` directory
5. Write documentation in `README.md`

## Tool Manifest

The `manifest.json` file is required for all tools. It contains metadata about your tool and its requirements. The manifest defines how your tool integrates with the Treffwerk platform and what capabilities it requires.

### Required Fields

- `id`: Unique identifier for your tool (e.g., "hello-world")
- `name`: Display name of your tool
- `description`: Brief description of what your tool does
- `version`: Semantic version (e.g., "1.0.0")
- `icon`: Icon identifier for your tool
- `entry`: Path to the main entry point (e.g., "/tools/hello-world/index.js")
- `author`: Author or organization name
- `homepage`: URL to the tool's homepage
- `languages`: Array of supported language codes (e.g., ["en", "de"])
- `tags`: Array of descriptive tags
- `category`: Tool category (e.g., "development", "health", "productivity")

### Example Manifest

```json
{
  "id": "hello-world",
  "name": "Hello World",
  "description": "A simple test tool to demonstrate the tool loading system",
  "version": "0.1.0",
  "icon": "code",
  "entry": "/tools/hello-world/index.js",
  "author": "Treffwerk",
  "homepage": "https://treffwerk.org/tools/hello-world",
  "languages": ["en"],
  "tags": ["test", "demo"],
  "category": "development"
}
```

### Best Practices

1. **IDs**: Use kebab-case for tool IDs (e.g., "hello-world", "mood-tracker")
2. **Versions**: Follow semantic versioning (MAJOR.MINOR.PATCH)
3. **Languages**: Include all languages your tool supports
4. **Tags**: Use relevant, descriptive tags to help users find your tool
5. **Categories**: Choose the most appropriate category for your tool

## Development Guidelines

1. **Code Style**: Follow the project's code style guidelines
2. **Testing**: Include unit tests for your tool
3. **Documentation**: Provide clear documentation
4. **Accessibility**: Ensure your tool is accessible
5. **Performance**: Optimize for performance
6. **Security**: Follow security best practices

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Tool Installation

Tools can be installed in two ways:

1. **Official Tools**: These are included in the main repository
2. **Community Tools**: These can be installed via the tool store

To install a community tool:

```bash
# Using the tool store in the app
1. Open the tool store
2. Find the tool you want to install
3. Click "Install"

# Using the command line
pnpm treffwerk install-tool <repository-url>
```

## Tool Updates

Tools can be updated in two ways:

1. **Automatic Updates**: Official tools are updated automatically
2. **Manual Updates**: Community tools can be updated manually

To update a tool:

```bash
# Using the app
1. Go to the tool's settings
2. Click "Check for Updates"

# Using the command line
pnpm treffwerk update-tool <tool-id>
```

## Support

For help with tool development:
- Check the [documentation](https://treffwerk.org/docs)
- Join the [Discord community](https://discord.gg/treffwerk)
- Open an [issue](https://github.com/treffwerk/treffwerk/issues) 