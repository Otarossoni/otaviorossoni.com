# otaviorossoni.com

<div align="center">
  <p>
    <strong>Personal portfolio with blog — minimalist, performant, and multilingual.</strong>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16.1.6-black.svg?style=flat-square&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/React-19-blue.svg?style=flat-square&logo=react" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-square&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC.svg?style=flat-square&logo=tailwind-css" alt="Tailwind CSS">
  </p>
</div>

---

## About

My personal portfolio. Beyond showcasing my projects, the site features an integrated blog with Markdown support and syntax highlighting.

## Features

- 🌍 **Internationalization**: Portuguese (PT), English (EN), and Spanish (ES) with next-intl.
- ⚡ **Performance**: Static rendering with Next.js App Router + Turbopack.
- 📝 **MDX Blog**: Posts with GitHub Flavored Markdown, syntax highlighting, and styled typography.
- 🌙 **Dark/Light mode**: Smooth toggle with preference saved in the browser.
- 🎨 **Clean UI**: Tailwind CSS v4, Phosphor Icons, Geist font.

## Stack

| Category        | Technology                             |
| --------------- | -------------------------------------- |
| **Framework**   | Next.js 16 (App Router)                |
| **Language**    | TypeScript                             |
| **Styling**     | Tailwind CSS 4                         |
| **Icons**       | Phosphor Icons                         |
| **i18n**        | next-intl                              |
| **Blog**        | MDX, next-mdx-remote, rehype-highlight |
| **Font**        | Geist (Google Fonts)                   |

## Getting Started

### Prerequisites

- Node.js 20.x+

### Installation

```bash
# Clone
git clone https://github.com/Otarossoni/otaviorossoni.com.git

# Enter the directory
cd otaviorossoni.com

# Install dependencies
npm install

# Start the development server
npm run dev
```

Access [http://localhost:3000](http://localhost:3000).

## Commands

| Command           | Description                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Development server with Turbopack       |
| `npm run build`   | Production build                        |
| `npm start`       | Production server                       |
| `npm run lint`    | Code linting                            |
| `npm run typecheck` | TypeScript type checking              |
