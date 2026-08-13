# SSR & Nuxt

`@borstihd/vue-custom-tooltip` is fully server-side rendering (SSR) safe. The package can be imported and installed in a universal (server + client) context without touching `document`, `window` or any other browser-only global.

## How it works

Tooltips are inherently interactive: they only become visible after a hover, focus or click. There is therefore nothing meaningful to render on the server, and the library takes advantage of that:

- **The trigger is server-rendered.** In component mode the `.tooltip-wrapper` / `.tooltip-trigger` markup and your default slot are part of the SSR output, so layout and content stay intact.
- **The tooltip itself is client-only.** The `<Teleport to="body">` is rendered only after `onMounted`, which avoids both the `document.body` lookup on the server and hydration mismatches.
- **IDs are hydration-safe.** ARIA IDs come from Vue's `useId()`, so server and client agree on the same value.
- **Theme CSS injection is a no-op on the server.** `injectThemeStyles()` returns early outside the browser; the stylesheet is injected once the client takes over.
- **The directive ships `getSSRProps`.** `v-tooltip` adds no attributes to the server-rendered markup and initializes its shared app lazily in the `mounted` hook.

You can query the environment yourself via the exported `isClient` flag:

```ts
import { isClient } from '@borstihd/vue-custom-tooltip'
```

## Nuxt setup

Create a **universal** plugin (no `.client` suffix needed):

```ts
// plugins/tooltip.ts
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueCustomTooltip, {
    theme: 'default',
    globalConfig: {
      position: 'auto',
      trigger: 'both',
      showDelay: 100,
    },
  })
})
```

Register the stylesheet globally in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  css: ['@borstihd/vue-custom-tooltip/style.css'],
})
```

::: tip Older path still works
`@borstihd/vue-custom-tooltip/dist/style.css` remains available for backwards compatibility.
:::

That's it — use the component and the directive anywhere, including inside server-rendered pages:

```vue
<template>
  <Tooltip content="Rendered on the server, shown on the client">
    <button>Hover me</button>
  </Tooltip>

  <button v-tooltip.top="'Works too'">
    Hover me
  </button>
</template>
```

## Troubleshooting

### `document is not defined`

Make sure you are on version `2.0.0` or newer. Earlier releases injected theme styles during `app.use()` without guarding for the server.

### Nuxt cannot resolve the package

If your Nitro build complains about the ESM output, add the package to `build.transpile`:

```ts
export default defineNuxtConfig({
  build: {
    transpile: ['@borstihd/vue-custom-tooltip'],
  },
})
```

### `<ClientOnly>` is not required

You do not need to wrap tooltips in `<ClientOnly>`. Doing so would also remove the trigger element from the server-rendered HTML, which hurts SEO and causes layout shift.

## Other SSR frameworks

The same guarantees apply to any Vue SSR setup (Vite SSR, Quasar SSR, custom `renderToString` servers). Install the plugin on the app instance you pass to `renderToString()`:

```ts
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'

const app = createSSRApp(App)
app.use(VueCustomTooltip)

const html = await renderToString(app)
```
