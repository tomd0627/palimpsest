# Palimpsest

A browser-based generative art piece. Layers of text and abstract marks accumulate on a parchment ground — each periodic wash partially ghosts what came before, creating a visual record of its own history.

## Running Locally

No build step. Open in a browser via an HTTP server (required for ES modules):

```sh
npx serve .
# or
npx http-server .
```

Then open `http://localhost:3000` (or the port shown).

## Development Setup

```sh
npm install
```

Installs dev-only tools: Prettier, ESLint, Stylelint, and Husky pre-commit hooks.

## How It Works

Three element types accumulate on the canvas using the Canvas 2D API:

- **Strokes** — Quadratic Bézier curves, 1–4px, in graphite, oxide, and umber tones. Drawn once at spawn time.
- **Text fragments** — Words from a curated archival corpus (Latin and English), rotated and translucent, rendered via `fillText`.
- **Washes** — Periodic full-canvas parchment overlays (triggered every 45–75 elements) that ghost accumulated marks, simulating the palimpsest effect.

Spawn timing uses an exponential distribution (~700ms mean, 400–1800ms range), producing an organic rhythm. Mouse position biases where new marks appear; clicks create local bursts.

The canvas is the state — no element array is maintained in memory after drawing.

## Controls

| Input | Effect |
|---|---|
| Mouse move | Biases spawn location 30% toward cursor |
| Click | Burst of 8–12 marks at cursor position |
| Space | Pause / Resume |
| R | Reset canvas |
| Pause button | Pause / Resume |
| Reset button | Reset canvas |

## Accessibility

Canvas content is decorative (`role="img"`). All UI controls are keyboard-accessible and meet WCAG 2.1 AA contrast. The `prefers-reduced-motion` media query is respected — a static composition renders on load with no animation.

## Palette

| Role | Value |
|---|---|
| Ground | `#f4efe6` (warm parchment) |
| Graphite ink | `rgb(35, 25, 15)` at 4–22% opacity |
| Oxide accent | `rgb(140, 65, 25)` at 5–12% opacity |
| Umber | `rgb(90, 58, 32)` at 5–14% opacity |
| Parchment wash | `rgb(244 239 230 / 9%)` |
