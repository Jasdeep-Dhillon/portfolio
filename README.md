# Portfolio

Personal portfolio website for Jasdeep Dhillon, built with Astro. Showcases GitHub projects, skills, and background as a Developer, UI/UX Engineer, and AI Scientist.

## Features

- Home page with hero video and tagline
- Projects page that fetches and displays all GitHub repos via the GitHub API
- Individual project pages with README content fetched from GitHub
- About page with personal background
- Resume page
- Dark/light theme support
- SEO-optimized with Astro content collections

## Technologies

- **Astro** 7 - static site generation
- **Tailwind CSS** v4 - styling
- **TypeScript**
- **Astro Icon** - icon components
- **Biome** - linting/formatting

## Getting Started

```bash
deno install
deno dev        # start dev server
deno run build  # build for production
deno run preview # preview production build
```

## Project Structure

```
src/
  assets/         - static assets (videos, data)
  components/     - reusable Astro components (Navbar, Footer, etc.)
  content.config.ts - Astro content collection config
  layouts/        - page layouts (MainLayout)
  lib/            - utilities (GitHub API client, types)
  pages/          - route pages (index, about, projects, resume, 404, 500)
  readme/         - cached READMEs from GitHub repos
  styles/         - global styles
```
