# Vite + Alpine.js + Tailwind CSS Template

![Template Stack](https://img.shields.io/badge/stack-Vite%20%7C%20Alpine.js%20%7C%20Tailwind%20CSS-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A lightweight starter template combining Vite, Alpine.js, and Tailwind CSS for building modern, interactive web applications.

## Features

- ⚡️ **Vite** - Lightning fast development server with HMR
- 🗻 **Alpine.js** - Minimal JavaScript framework for adding interactivity
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📦 **TypeScript** - Type safety for your JavaScript
- 🍞 **Bun** - Fast package manager and script runner
- 🧹 **Biome** - One-pass linter and formatter
- 🧪 **Vitest** - Fast unit testing

## Quick Start

```bash
# Clone the repository
git clone https://github.com/vzsoares/vite-alpine-tailwind-temaplate.git my-project

# Navigate to the directory
cd my-project

# Install dependencies
bun install

# Start development server
bun run dev
```

## Build for Production

```bash
bun run build
```

## Preview Production Build

```bash
bun run preview
```

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `bun run dev`       | Start the Vite dev server with HMR           |
| `bun run build`     | Build for production into `dist/`            |
| `bun run preview`   | Preview the production build locally         |
| `bun run check`     | Lint **and** format the codebase (Biome)     |
| `bun run lint`      | Lint without writing changes (Biome)         |
| `bun run format`    | Format files in place (Biome)                |
| `bun run typecheck` | Type-check with `tsc --noEmit`               |
| `bun run test`      | Run the test suite once (Vitest)             |
| `bun run test:watch`| Run tests in watch mode (Vitest)             |

## Project Structure

```
/
├── public/         # Static assets copied as-is
├── src/            # Source files
│   ├── app.ts      # Main Alpine.js application
│   ├── utils.ts    # Helper utilities
│   ├── utils.test.ts # Example Vitest test
│   └── styles.css  # Tailwind entry stylesheet
├── index.html      # Entry HTML file
├── vite.config.js  # Vite config (Tailwind plugin + Vitest)
├── biome.json      # Biome linter & formatter config
└── tsconfig.json   # TypeScript configuration
```

> Tailwind CSS v4 is wired in through the official `@tailwindcss/vite` plugin
> (no PostCSS or autoprefixer needed). Styles live in `src/styles.css` via a
> single `@import "tailwindcss";`.

## License

[MIT License](LICENSE)

---

Created by [vzsoares](https://github.com/vzsoares)
