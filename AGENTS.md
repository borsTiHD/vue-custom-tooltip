# AGENTS.md

`@borstihd/vue-custom-tooltip` — a zero-dependency Vue 3 tooltip shipped as **both a component and a directive**. The repo is also its own demo app (`src/App.vue`) and VitePress docs site (`docs/`).

## Commands

Package manager is **pnpm** (Node `^20.19.0 || >=22.12.0`).

| Task | Command |
| --- | --- |
| Demo dev server | `pnpm dev` |
| Unit tests (watch) | `pnpm test:unit` |
| Unit tests (once, use in CI/agent runs) | `pnpm test:unit run` |
| Type check | `pnpm type-check` |
| Lint / autofix | `pnpm lint` / `pnpm lint:fix` |
| Build library (`dist/`) | `pnpm build:lib` |
| Build + type-check | `pnpm build` |
| Docs dev / build | `pnpm docs:dev` / `pnpm docs:build` |

Always run `pnpm lint:fix`, `pnpm type-check`, and `pnpm test:unit run` after changing `src/`.

## Architecture

Everything the published package contains lives under these paths — see [tsconfig.lib.json](tsconfig.lib.json) for the exact allowlist:

- [src/index.ts](src/index.ts) — public API surface + `VueCustomTooltip` plugin (`globalConfig`, `theme`, `componentName`, `directiveName`) and the dynamic theme-CSS import map.
- [src/components/tooltip/Tooltip.vue](src/components/tooltip/Tooltip.vue) — the only shipped component. Teleports to `body`, exposes `show()/hide()/toggle()/isVisible()`.
- [src/composables/](src/composables/) — one concern each: `useTooltipProps` (value resolution), `useTooltipVisibility` (state + delays), `useTooltipPosition` (auto placement + arrow), `useTooltipEvents` (component-mode listeners), `useExternalTrigger` (directive-mode listeners + ARIA).
- [src/directives/tooltip.ts](src/directives/tooltip.ts) — `v-tooltip`. Renders **all** directive tooltips through one lazily created shared Vue app + reactive instance store; parses modifiers into props.
- [src/config/globalConfig.ts](src/config/globalConfig.ts) — global/runtime defaults.
- [src/types/](src/types/), [src/styles/themes/](src/styles/themes/).

**Demo-only, never referenced from library code:** `src/main.ts`, `src/App.vue`, `src/components/*.vue` (Button, Card, DarkModeToggle, PresetSwitcher), `src/components/showcase/**`, `src/assets/main.css`. Adding an import from library code into any of these breaks the lib build.

**Prop precedence (do not reorder):** explicit component prop → global config → `DEFAULT_TOOLTIP_PROPS`. Explicitness is detected by inspecting `instance.vnode.props` (`wasPropPassed()` in [src/composables/useTooltipProps.ts](src/composables/useTooltipProps.ts)), so every entry in `withDefaults()` in `Tooltip.vue` must stay `undefined` — real defaults belong in `DEFAULT_TOOLTIP_PROPS` only.

Component mode and directive mode share the same `Tooltip.vue`; the directive passes `externalTrigger`. Any behavior change must be checked in **both** modes.

## Conventions

- Style is [@antfu/eslint-config](eslint.config.mjs): **no semicolons**, single quotes, sorted imports. Note `eslint.config.mjs` wins over the stale `eslint.config.ts` — edit the `.mjs` one.
- `<script setup lang="ts">` with type-based `defineProps`/`defineEmits`. Alias `@/` → `src/`.
- CSS custom properties are namespaced `--vct-*` (themes: `--vct-<theme>-*`).
- Naming: PascalCase components/types, camelCase functions, `use*` composables.

### Adding a prop

1. `TooltipProps` in [src/types/tooltip.ts](src/types/tooltip.ts)
2. `DEFAULT_TOOLTIP_PROPS` + a `getEffectiveProp()` computed in [src/composables/useTooltipProps.ts](src/composables/useTooltipProps.ts)
3. An `undefined` entry in `withDefaults()` and the consuming logic in [src/components/tooltip/Tooltip.vue](src/components/tooltip/Tooltip.vue)
4. If it should be a directive modifier: extend `TooltipDirectiveModifiers` in [src/types/tooltip-modifiers.d.ts](src/types/tooltip-modifiers.d.ts) and parse it in [src/directives/tooltip.ts](src/directives/tooltip.ts)
5. Document it in [docs/api/component.md](docs/api/component.md) / [docs/api/directive.md](docs/api/directive.md)

### Adding a theme

Follow [THEME_GUIDE.md](THEME_GUIDE.md) and [src/styles/themes/README.md](src/styles/themes/README.md): new `src/styles/themes/<name>.css` using the `.custom-tooltip.tooltip-theme-<name> .tooltip-content` selector and `.tooltip-light` / `.tooltip-dark` / `.tooltip-auto` variants, then extend the `TooltipTheme` union and the dynamic import map in [src/index.ts](src/index.ts).

## Testing

Tests live in [src/\_\_tests\_\_/](src/__tests__/), jsdom environment, `@vue/test-utils`. [src/\_\_tests\_\_/setup.ts](src/__tests__/setup.ts) mocks `matchMedia` and `localStorage` — don't re-mock them per test. Mount with `{ global: { plugins: [VueCustomTooltip] } }`, call `resetTooltipGlobalConfig()` in `beforeEach` when touching global config, and `await nextTick()` (real timers, no fake timers) after triggering show/hide. Because tooltips are teleported to `body`, assert against `document.body` rather than the wrapper.

## Docs & release

- Doc pages are VitePress; a new page must also be added to the sidebar in `docs/.vitepress/config.ts`.
- Add user-visible changes to the `[Unreleased]` section of [CHANGELOG.md](CHANGELOG.md) (Keep a Changelog format). `.github/workflows/publish.yml` converts it into a release via [scripts/update-changelog.js](scripts/update-changelog.js) — never bump the version or edit released sections by hand.
- `.github/workflows/deploy.yml` publishes the docs to GitHub Pages on push to `main`.
