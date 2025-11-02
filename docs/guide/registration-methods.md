# Registration Methods

There are three different ways to register Vue Custom Tooltip in your application. Choose the method that best fits your needs.

## 1. Full Plugin Registration <Badge type="tip" text="recommended" />

Register both the component and directive at once. This is the recommended approach if you plan to use both features:

::: code-group
```ts [Default usage]
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import '@borstihd/vue-custom-tooltip/dist/style.css'

const app = createApp(App)

// Register both component and directive
app.use(VueCustomTooltip)

app.mount('#app')
```

```ts [With configuration]
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import '@borstihd/vue-custom-tooltip/dist/style.css'

const app = createApp(App)

// Register with custom configuration
app.use(VueCustomTooltip, {
  componentName: 'MyTooltip', // Custom component name
  directiveName: 'my-tooltip', // Custom directive name
  theme: 'default', // Choose theme
  globalConfig: {
    position: 'top',
    showDelay: 200
  }
})

app.mount('#app')
```
:::

## 2. Component-Only Registration

If you only need the component functionality, you can register just the `Tooltip` component:

```ts
import { Tooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import '@borstihd/vue-custom-tooltip/dist/style.css'

const app = createApp(App)

// Register only the component
app.component('Tooltip', Tooltip)

app.mount('#app')
```

Usage example:
```vue
<template>
  <Tooltip content="Hello!">
    <button>Hover me</button>
  </Tooltip>
</template>
```

## 3. Directive-Only Registration

If you prefer using only the directive syntax, you can register just the `v-tooltip` directive:

```ts
import { vTooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import '@borstihd/vue-custom-tooltip/dist/style.css'

const app = createApp(App)

// Register only the directive
app.directive('tooltip', vTooltip)

app.mount('#app')
```

Usage example:
```vue
<template>
  <button v-tooltip="'Hello!'">
    Hover me
  </button>
</template>
```

## Comparison

Here's a quick comparison of the three registration methods:

| Method | Features | Use Case |
|--------|----------|-----------|
| Full Plugin | All features | When you need both component and directive |
| Directive Only | Simple tooltips | When you need basic text tooltips |
| Component Only | Rich content, slots | When you need complex tooltips with HTML content |

## TypeScript Support

All registration methods maintain full TypeScript support:

```ts
// Full plugin with types
import type { TooltipPluginOptions } from '@borstihd/vue-custom-tooltip'

// Component only with types
import type { TooltipProps } from '@borstihd/vue-custom-tooltip'

// Directive only with types
import type { TooltipDirectiveOptions } from '@borstihd/vue-custom-tooltip'

const options: TooltipPluginOptions = {
  componentName: 'MyTooltip',
  directiveName: 'my-tooltip'
}

app.use(VueCustomTooltip, options)
```

## Best Practices

1. **Choose Based on Needs**
   - Use full plugin registration if you might need both features
   - Choose component-only for rich content needs
   - Choose directive-only for simple text tooltips

2. **Consistent Registration**
   - Use the same registration method throughout your project
   - Don't mix different registration methods

3. **Configuration Management**
   - With component-only: Use props for configuration
   - With directive-only: Use modifiers and binding options
   - All methods support applying global configuration for consistent settings

## Next Steps

- [Component Usage](./component-usage.md) - Learn component features
- [Directive Usage](./directive-usage.md) - Learn directive features
- [Global Config](./global-config.md) - Configure default behavior
