# Palimpsest — Handoff

## Current Phase

**Phase 7 — Deploy to Netlify** (next task)

## What Was Just Completed

All project files built and verified in a single session. All three linters pass clean (ESLint, Stylelint, Prettier). Dev server confirmed serving all modules at HTTP 200.

- Phase 2–4: `index.html`, `css/style.css`, `js/` module tree, UI chrome
- Phase 6: `package.json`, `.prettierrc`, `.eslintrc.json`, `stylelint.config.js`, `.husky/pre-commit`, `npm install` run, hooks active
- Phase 7: `netlify.toml`, `_redirects` written
- Phase 8: `README.md`, `CLAUDE.md`, `HANDOFF.md`, `.gitignore` all updated

## Exact Next Task

1. Commit and push to `github.com/tomd0627/palimpsest`
2. Connect repo in Netlify dashboard → deploy
3. Once live, run **PageSpeed Insights** on the deployed URL (same Lighthouse engine, no local Chrome issues): [pagespeed.web.dev](https://pagespeed.web.dev) → Desktop
4. In DevTools Network tab on the live URL, verify security headers are present (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
5. Test `prefers-reduced-motion`: enable in OS, reload — static composition, no animation, Pause button hidden

## Decisions Made This Session

- **Stamp-and-forget architecture**: elements drawn once, canvas is state — no element array in memory
- **Ground**: `#f4efe6` parchment; graphite `rgb(35 25 15)` + oxide `rgb(140 65 25)` + umber `rgb(90 58 32)`
- **System fonts only**: Georgia, Courier New — no runtime font loading, no FOUT
- **ES modules without bundler**: `type="module"` in script tag, works in all modern browsers
- **Wash trigger**: deterministic counter (45–75 elements), resets after each wash — not per-element probability
- **Exponential spawn delay**: mean 700ms, clamped 400–1800ms using `-Math.log(1 - u) * 700`
- **ResizeObserver + ctx.setTransform**: pixel-ratio aware, setTransform avoids accumulated scale
- **CSS modern color syntax**: `rgb(42 30 18 / 25%)` not `rgba()` — required by stylelint-config-standard v36
- **Lighthouse CLI skipped**: permission error on Windows temp cleanup; use PageSpeed Insights instead

## Unfinished Work / Gotchas

- **Must test visually in browser** — no automated tests for generative output; confirm marks accumulate, washes ghost, controls work
- High-DPI displays (Retina): verify no blurriness — `ctx.setTransform(dpr, ...)` handles this
- Mobile/touch: `click` fires on tap, but `mousemove` does not — cursor bias unavailable on touch; acceptable behavior
- `prefers-reduced-motion` static composition may trigger one or two washes across 80 synchronous spawns — intentional

## Remaining Phases

- **Phase 7**: Deploy to Netlify, verify security headers live
- **Phase 8**: PageSpeed Insights audit (target Performance ≥ 90, Accessibility ≥ 90), visual test at 320px / 768px / 1440px
