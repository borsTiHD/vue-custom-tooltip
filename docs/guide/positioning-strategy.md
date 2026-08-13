# Positioning Strategy

Tooltips can be positioned in two ways: with native **CSS anchor positioning** or with **JavaScript** measurements.

```ts
app.use(VueCustomTooltip, {
  positioningStrategy: 'css' // default
})
```

## The two strategies

| | `css` (default) | `js` |
|---|---|---|
| Placement | `position-anchor` / `position-area` | `getBoundingClientRect()` |
| Auto flip | `position-try-fallbacks` | JavaScript space detection |
| On scroll | Tooltip follows the trigger | Tooltip is hidden |
| Out-of-view trigger | Hidden via `position-visibility` | Tooltip is hidden |
| Overflow handling | Content wraps inside the available area | Tooltip box is shifted back into the viewport |
| Browser support | [Baseline 2026](https://caniuse.com/css-anchor-positioning) | All browsers |

The `css` strategy performs no layout measurements for placement, so opening a tooltip no longer forces a synchronous layout. When `showArrow` is `false`, it needs no positioning JavaScript at all.

## Automatic fallback

`'css'` never breaks in older browsers. The support check runs once per page:

```ts
CSS.supports('anchor-name: --a') && CSS.supports('position-try-fallbacks: flip-block')
```

If it fails, the tooltip transparently uses the `js` strategy instead. During SSR the check always reports `false`, so the first client render matches the server output.

You can query the same check yourself:

```ts
import { supportsAnchorPositioning } from '@borstihd/vue-custom-tooltip'

if (supportsAnchorPositioning()) {
  // native anchor positioning is active
}
```

## Choosing a strategy

Globally, when registering the plugin:

```ts
app.use(VueCustomTooltip, { positioningStrategy: 'js' })
```

Per tooltip, with the component:

```vue
<Tooltip content="Positioned with JavaScript" positioning-strategy="js">
  <button>Hover me</button>
</Tooltip>
```

Per tooltip, with the directive:

```vue
<button v-tooltip.js="'Positioned with JavaScript'">Hover me</button>
<button v-tooltip.css="'Positioned with CSS anchors'">Hover me</button>
```

At runtime:

```ts
import { setTooltipGlobalPositioningStrategy } from '@borstihd/vue-custom-tooltip'

setTooltipGlobalPositioningStrategy('js')
```

## Why the arrow still uses JavaScript

CSS cannot report which fallback position the browser picked, and `@position-try` does not accept custom properties. The arrow therefore keeps a small synchronisation step: two `getBoundingClientRect()` calls after the tooltip is shown, and once per animation frame while scrolling.

Set `showArrow: false` to remove that last piece of positioning JavaScript:

```ts
app.use(VueCustomTooltip, {
  globalConfig: { showArrow: false }
})
```

## Anchor names on your elements

In directive mode the trigger belongs to your markup, so the library writes an `anchor-name` inline style onto it while the tooltip is registered:

```html
<button style="anchor-name: --vct-a7">Hover me</button>
```

The property is applied after mount only — it never appears in server-rendered HTML — and is removed again when the tooltip is unregistered or when the `js` strategy is active.
