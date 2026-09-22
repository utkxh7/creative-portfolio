# Chingari

Collector's-edition art lighters, sold as an ecommerce brand. "Chingari starts more than fires."

**Live site:** _add your Cloudflare Pages URL here once deployed_

## Structure
Plain HTML/CSS/JS — no framework, no build step, no npm install required.

```
index.html      → homepage (immersive retro-futurist hero + product grid)
shop.html       → full product listing with filters
about.html      → brand story
contact.html    → contact form
styles.css      → all styles, design tokens at the top
script.js       → product data + all interactivity
assets/         → product artwork + logo
```

## Running it locally
No server needed — just open `index.html` in a browser. For live-reload while editing, use the VS Code "Live Server" extension and right-click → "Open with Live Server."

## Deployment
Connected to Cloudflare Pages via this GitHub repo. Push to `main` → auto-deploys within ~30 seconds. No build command needed; output directory is the repo root.

## Project context for contributors (including AI assistants)
See [`Chingaari.md`](./Chingaari.md) — it documents brand rules, design tokens, and decisions already made (e.g. no fictional illustrator attribution) so they don't get accidentally reversed.
