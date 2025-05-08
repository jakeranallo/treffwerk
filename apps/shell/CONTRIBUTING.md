# Contributing to Treffwerk PWA

Thank you for your interest in contributing to Treffwerk PWA! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the Issues section.
- If not, create a new issue with a clear title and description.
- Include steps to reproduce the bug, expected behavior, and actual behavior.
- If possible, include screenshots or code snippets.

### Suggesting Enhancements

- Check if the enhancement has already been suggested in the Issues section.
- If not, create a new issue with a clear title and description.
- Explain why this enhancement would be useful to most users.
- Provide examples of how the enhancement would work.

### Pull Requests

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Run tests to ensure your changes don't break existing functionality.
5. Submit a pull request with a clear description of the changes.

## Development Setup

1. Clone the repository:
\`\`\`bash
git clone https://github.com/treffwerk/treffwerk-pwa.git
cd treffwerk-pwa
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

## Style Guide

### Code Formatting

- We use Prettier for code formatting.
- Run `npm run format` before committing your changes.

### TypeScript

- Use TypeScript for all new code.
- Ensure your code passes the TypeScript compiler.

### Component Structure

- Follow the existing component structure.
- Use functional components with hooks.
- Keep components small and focused on a single responsibility.

### Internationalization

- All user-facing text should be internationalized.
- Add new translations to the appropriate files in the `i18n` directory.

## Git Workflow

1. Create a branch for your feature or bug fix.
2. Make your changes.
3. Run tests to ensure your changes don't break existing functionality.
4. Commit your changes with a clear commit message.
5. Push your branch to your fork.
6. Submit a pull request.

## License

By contributing to Treffwerk PWA, you agree that your contributions will be licensed under the project's MIT License.
\`\`\`

Let's create a LICENSE file:
