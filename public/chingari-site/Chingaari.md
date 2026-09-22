# Chingari — Project Context

Read this before making changes. It captures decisions already made so they don't get silently reversed.

## What this is
Chingari ("spark" in Hindi) is a D2C ecommerce brand selling collector's-edition art lighters in India. This repo is the marketing/storefront website — currently pre-order only, no live checkout yet.

## Tech stack
Plain HTML/CSS/JS. No framework, no build step, no npm dependencies required to run it.
- `index.html`, `shop.html`, `about.html`, `contact.html` — the four pages
- `styles.css` — single shared stylesheet, uses CSS custom properties (design tokens) defined at the top
- `script.js` — shared JS: product data array, product card rendering, modal, shop filters, nav toggle, form stubs
- `assets/` — product artwork + logo

Open `index.html` directly in a browser to preview locally — no server needed. Deployed via Cloudflare Pages (static, connected to GitHub `main` branch — push to deploy).

## Brand facts (don't drift from these)
- Tagline: **"Chingari starts more than fires."**
- Logo: `assets/logo-final.png` — two-tone wordmark ("CHIN" dark brown / "GAARI" orange) with small Devanagari "चिंगारी" beneath. It has a transparent background — if a new logo file is ever swapped in, it likely needs the same background-removal treatment (check corner pixels aren't pure white/cream before using).
- Current lineup is called **"Chapter One"** — 4 designs, pre-order only, numbered editions (max 250 per design), NOT yet in production.
- **No named illustrators/artisans.** The designs are AI-generated for now, and product copy must not invent artist names, hometowns, or "artist signed" claims — this was deliberately removed once already (see git history / prior conversation). Product stories should be about the *design concept*, not a fictional person. The About page explicitly invites real illustrators to collaborate on "Chapter Two," so the door is open, but don't retroactively claim Chapter One had one.
- Real product specs used in the product modal: Finish, Fluid, Capacity, Edition. No "Origin" or "Artist" fields.

## Design tokens (in styles.css :root)
- Cream `#F6EEDD` / dark aubergine `#241333` / marigold `#D9720C` / gold `#B8860B`
- Fonts: `Big Shoulders Display` (heavy headlines), `Fraunces` italic (taglines/quotes), `Inter` (body), `IBM Plex Mono` (labels/eyebrows)
- Signature element: the rotating "seal" (`.seal` class, built by `buildSeal()` in script.js) — used as a numbered-edition badge on product cards and decoratively on the About page. Keep using this rather than inventing a new badge style.
- **Note:** a "Neon Memory" retro-futurist palette + animated synthwave hero was tried and explicitly rejected in favour of this simpler version — don't reintroduce dark neon-pink/cyan theming or the canvas ember/grid hero without being asked again.

## No account system
No Google Sign-In / login. Guest-only flow by design — don't add a login button back in.

## Pre-order flow (current state)
No live payment gateway yet (Razorpay pending KYC). Until then:
- Homepage hero and product modal both link to `shop.html#reserve`
- Shop page has a "Reserve Your Spot" waitlist form (`.reserve-form`) — name, phone, email, design dropdown, no payment. Pre-fills the design dropdown via `?design=` query param set by the product modal.
- Contact form and newsletter form both POST to Formspree — **the form IDs are placeholders** (`YOUR_FORM_ID`, `YOUR_NEWSLETTER_FORM_ID`, `YOUR_RESERVE_FORM_ID` in contact.html/index.html/shop.html) and need to be swapped for real Formspree endpoint IDs before these actually deliver anywhere.
- All three forms submit via `fetch()` in script.js (`wireForm()`) so they show inline success/error text without a page reload.

## Legal pages
`privacy-policy.html`, `terms.html`, `refund-policy.html`, `shipping-policy.html` exist and are linked from every footer. They contain `[bracketed placeholders]` (support email, business name, city, timelines) that still need to be filled in with real values before launch. `terms.html` includes the AI-generated-art disclosure — don't remove or water this down.

## Product data
Lives in `PRODUCTS` array at the top of `script.js`. Each product needs: `id`, `name`, `house`, `houseSlug`, `tag`, `tagClass`, `price`, `pieces`, `desc`, `story`, `finish`, `fluid`, `capacity`, `edition`, `img`. Adding a product = add an entry here; the shop grid, home grid, and modal all render from this array automatically.

## Known gaps / not wired up yet
- Formspree form IDs are placeholders — see "Pre-order flow" above
- No real checkout/payment — waiting on Razorpay KYC
- Product photos are the raw AI-generated artwork, not photographed on an actual lighter body — fine for pre-order, will need real product photography before general sale
- No `robots.txt` / `sitemap.xml` yet
- Instagram/Twitter footer links are still `#` placeholders — no social accounts linked yet

## When making changes
- Keep it framework-free unless there's a strong reason to introduce one — the whole point of this setup was zero build-step friction.
- If editing product copy, don't reintroduce artist/illustrator attribution (see above).
- This file should be updated whenever a structural or brand decision changes, so it stays accurate for future sessions.
