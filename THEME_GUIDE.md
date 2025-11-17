# Theme Configuration Guide

## Overview

Vue Custom Tooltip supports predefined UI framework themes! You can easily apply PrimeVue or Vuetify styling to all your tooltips with a simple configuration option.

## Available Themes

- **`default`**: The built-in theme using the component's original styles (no additional CSS loaded)
- **`classic`**: An alternative skin, using clean stylings
- **`primevue`**: Styles inspired by PrimeVue's design system
- **`vuetify`**: Styles inspired by Vuetify's Material Design implementation

## Basic Usage

### Option 1: Global Theme Configuration

Apply a theme to all tooltips in your application:

```typescript
import { createApp } from 'vue'
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import App from './App.vue'

const app = createApp(App)

app.use(VueCustomTooltip, {
  theme: 'primevue' // or 'classic', 'vuetify', 'default'
})

app.mount('#app')
```

### Option 2: Theme with Global Config

Combine theme styling with global configuration:

```typescript
app.use(VueCustomTooltip, {
  theme: 'primevue',
  globalConfig: {
    position: 'top',
    trigger: 'hover',
    showDelay: 200,
    hideDelay: 150,
    dark: 'auto', // Supports auto-detection, true, or false
    showArrow: true,
    offset: 12,
    maxWidth: '300px',
  },
})
```

### Option 3: No Theme (Default Styling)

If you don't specify a theme, the default tooltip styling will be used:

```typescript
// These are equivalent
app.use(VueCustomTooltip)
app.use(VueCustomTooltip, { theme: 'default' })
```

## Programmatic Theme Control

You can also change the theme programmatically:

```typescript
import { getTooltipGlobalTheme, setTooltipGlobalTheme } from '@borstihd/vue-custom-tooltip'

// Change theme at runtime
setTooltipGlobalTheme('vuetify')

// Get current theme
const currentTheme = getTooltipGlobalTheme()

// Revert to default (uses component's built-in styles)
setTooltipGlobalTheme('default')
// or
setTooltipGlobalTheme(undefined)
```

## Theme Features

### Dark Mode Support

All themes automatically support dark mode through:
1. **Auto detection** (`dark: 'auto'`): Responds to Tailwind's `.dark` class or `prefers-color-scheme`
2. **Forced dark mode** (`dark: true`): Always use dark theme
3. **Forced light mode** (`dark: false`): Always use light theme

```typescript
// Auto-detect dark mode
app.use(VueCustomTooltip, {
  theme: 'primevue',
  globalConfig: {
    dark: 'auto', // Default
  },
})

// Force dark mode
app.use(VueCustomTooltip, {
  theme: 'vuetify',
  globalConfig: {
    dark: true,
  },
})
```

### CSS Custom Properties

Each theme uses CSS custom properties that you can override in your own styles:

```css
/* Override PrimeVue theme colors */
:root {
  --vct-primevue-background: #1a1a1a;
  --vct-primevue-text-color: #ffffff;
  --vct-primevue-border-radius: 8px;
}

/* Override Vuetify theme colors */
:root {
  --vct-vuetify-background: rgba(50, 50, 50, 0.95);
  --vct-vuetify-text-color: #e0e0e0;
  --vct-vuetify-font-family: 'Custom Font', sans-serif;
}
```

## Notes

- Themes are injected as `<style>` elements in the document `<head>`
- Only one theme can be active at a time
- Changing themes at runtime will automatically remove the previous theme styles
- Themes work with both the component API (`<Tooltip>`) and directive API (`v-tooltip`)
- All theme styles respect the tooltip's position, trigger, and other configuration options

## Creating Custom Themes

See [styles/themes/README.md](../src/styles/themes/README.md) for information on creating your own custom themes.
