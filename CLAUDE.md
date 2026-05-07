# Palimpsest

A browser-based generative art piece for the Tom DeLuca portfolio. Layers of text and abstract marks accumulate on a parchment ground; periodic washes ghost what came before.

## Tech Stack

Vanilla HTML/CSS/JS with Canvas 2D API. No framework, no canvas library, no bundler. ES modules served directly from the browser.

## Commands

```sh
npm install         # install dev dependencies
npx serve .         # local dev server (required for ES modules via http://)
```

## Architecture

```
js/
  main.js       init, event wiring, rAF loop, pause/reset state
  renderer.js   canvas sizing (pixel-ratio aware), ResizeObserver
  system.js     spawn timer, element selection, Gaussian sampling, layer counter
  elements.js   pure draw functions — no state
  corpus.js     archival word list (static array)
```

## Key Design Decisions

- **Stamp-and-forget**: elements drawn once at spawn time; the canvas IS the state — no element array maintained in memory
- **rAF loop**: ticks every frame but only draws when spawn timer fires (~every 400–1800ms, exponentially distributed)
- **Wash trigger**: every 45–75 elements (deterministic threshold reset after each wash), not per-element probability
- **System fonts only**: Georgia, Courier New — no runtime font loading
- **Reduced motion**: static composition (80 elements) rendered synchronously on load, then loop stays idle

## Conventions

- All draw functions in `elements.js` are pure: `(ctx, ...args) => void`
- State lives in `system.js` (element/layer counters) and `main.js` (pause, mouse coords)
- LF line endings, 2-space indent, single quotes (enforced by Prettier)
- Pre-commit hooks run ESLint, Stylelint, and Prettier via lint-staged
