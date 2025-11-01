# Global Configuration

Vue Custom Tooltip allows you to set global defaults that apply to all tooltips in your application. This is useful for maintaining consistency and reducing repetitive prop declarations.

## Basic Configuration

Set global defaults when installing the plugin:

```ts
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import '@borstihd/vue-custom-tooltip/dist/style.css'

const app = createApp(App)

app.use(VueCustomTooltip, {
  // Theme configuration
  theme: 'default', // 'classic', 'vuetify', 'primevue'

  // Component/directive names
  componentName: 'Tooltip',
  directiveName: 'tooltip',

  // Global defaults
  globalConfig: {
    position: 'auto',
    trigger: 'both',
    showDelay: 100,
    hideDelay: 100,
    dark: 'auto',
    showArrow: true,
    offset: 8,
    maxWidth: '250px'
  }
})

app.mount('#app')
```

## Configuration Priority

The configuration follows this priority order:

1. Individual component/directive settings (highest priority)
2. Global configuration
3. Built-in defaults (lowest priority)

Example:

```vue
<template>
  <!-- Uses global config (position: 'top') -->
  <Tooltip content="Uses global position">
    <button>Default</button>
  </Tooltip>

  <!-- Overrides global config -->
  <Tooltip
    content="Custom position"
    position="right"
  >
    <button>Override</button>
  </Tooltip>
</template>
```

## Runtime Configuration

You can manage global configuration at runtime:

```ts
import {
  getTooltipGlobalConfig,
  resetTooltipGlobalConfig,
  setTooltipGlobalConfig
} from '@borstihd/vue-custom-tooltip'

// Update specific options
setTooltipGlobalConfig({
  position: 'bottom',
  showDelay: 300
})

// Get current configuration
const config = getTooltipGlobalConfig()

// Reset to defaults
resetTooltipGlobalConfig()
```

## Theme Configuration

### Setting Global Theme

```ts
app.use(VueCustomTooltip, {
  theme: 'primevue', // or 'classic', 'vuetify'
  globalConfig: {
    dark: 'auto' // Theme-aware dark mode
  }
})
```

### Runtime Theme Changes

```ts
import {
  getTooltipGlobalTheme,
  setTooltipGlobalTheme
} from '@borstihd/vue-custom-tooltip'

// Change theme
setTooltipGlobalTheme('vuetify')

// Get current theme
const theme = getTooltipGlobalTheme()
```

## Custom Component/Directive Names

Customize registration names to avoid conflicts:

```ts
app.use(VueCustomTooltip, {
  componentName: 'MyTooltip',
  directiveName: 'my-tooltip'
})
```

Usage with custom names:

```vue
<template>
  <!-- Component usage -->
  <MyTooltip content="Custom name">
    <button>Hover me</button>
  </MyTooltip>

  <!-- Directive usage -->
  <button v-my-tooltip="'Custom directive'">
    Hover me
  </button>
</template>
```

## Complete Configuration Example

```ts
app.use(VueCustomTooltip, {
  // Theme settings
  theme: 'primevue',

  // Custom names
  componentName: 'VTooltip',
  directiveName: 'v-tip',

  // Global defaults
  globalConfig: {
    // Positioning
    position: 'auto',
    offset: 12,

    // Behavior
    trigger: 'both',
    showDelay: 150,
    hideDelay: 150,

    // Appearance
    dark: 'auto',
    showArrow: true,
    maxWidth: '300px',
    tooltipClass: 'my-tooltip'
  }
})
```

## TypeScript Support

The configuration options are fully typed:

```ts
import type {
  TooltipConfig,
  TooltipPluginOptions,
  TooltipTheme
} from '@borstihd/vue-custom-tooltip'

const config: TooltipConfig = {
  position: 'auto',
  dark: 'auto'
}

const theme: TooltipTheme = 'primevue'

const options: TooltipPluginOptions = {
  theme,
  globalConfig: config
}

app.use(VueCustomTooltip, options)
```

## Best Practices

1. **Consistent Settings**: Use global config for app-wide consistency
2. **Theme Selection**: Choose a theme that matches your UI framework
3. **Dark Mode**: Use `dark: 'auto'` for system-aware theming
4. **Custom Names**: Use custom names if you have naming conflicts
5. **Type Safety**: Leverage TypeScript types for configuration
