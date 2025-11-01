# Theme Overview

Vue Custom Tooltip comes with a theming system that allows you to match your tooltips with popular UI frameworks or create your own custom themes.

## Available Themes

- **`default`**: Clean, modern default theme
- **`classic`**: Traditional tooltip styling
- **`primevue`**: Matches PrimeVue's design system
- **`vuetify`**: Follows Material Design principles

## Setting a Theme

### Global Theme

Configure the theme for all tooltips in your application:

```ts
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import '@borstihd/vue-custom-tooltip/dist/style.css'

const app = createApp(App)

app.use(VueCustomTooltip, {
  theme: 'primevue', // or 'classic', 'vuetify', 'default'
})

app.mount('#app')
```

### Runtime Theme Changes

You can change themes programmatically:

```ts
import {
  getTooltipGlobalTheme,
  setTooltipGlobalTheme
} from '@borstihd/vue-custom-tooltip'

// Change theme at runtime
setTooltipGlobalTheme('vuetify')

// Get current theme
const currentTheme = getTooltipGlobalTheme()

// Revert to default theme
setTooltipGlobalTheme('default')
```

## Dark Mode Support

All themes automatically support dark mode through:

1. **Auto Detection** (`dark: 'auto'`):
   - Responds to system preference via `prefers-color-scheme`
   - Supports Tailwind's `.dark` class

2. **Manual Control**:
   - Force dark mode: `dark: true`
   - Force light mode: `dark: false`

### Example Configuration

```ts
// Auto-detect dark mode (default - recommended)
app.use(VueCustomTooltip, {
  theme: 'primevue',
  globalConfig: {
    dark: 'auto'
  }
})

// Force dark mode
app.use(VueCustomTooltip, {
  theme: 'vuetify',
  globalConfig: {
    dark: true
  }
})
```

## CSS Custom Properties

You can customize the tooltip's appearance using the following CSS variables:

### Available CSS Variables

```css
/* Background Colors */
--vct-background        /* Light mode background (default: #ffffff) */
--vct-background-dark   /* Dark mode background (default: #2a2a2a) */

/* Text Colors */
--vct-text-color        /* Light mode text color (default: #374151) */
--vct-text-color-dark   /* Dark mode text color (default: #e0e0e0) */

/* Border Properties */
--vct-border-color       /* Light mode border color (default: #d1d5db) */
--vct-border-color-dark  /* Dark mode border color (default: #444) */
--vct-border-radius      /* Tooltip border radius (default: 8px) */

/* Focus State */
--vct-focus-color       /* Focus outline color (default: #3b82f6) */
```

### Example: Custom Theme

```css
:root {
  --vct-background: #f8f9fa;
  --vct-background-dark: #1a1a1a;
  --vct-text-color: #2c3e50;
  --vct-text-color-dark: #f1f1f1;
  --vct-border-color: #dee2e6;
  --vct-border-color-dark: #4a4a4a;
  --vct-border-radius: 4px;
  --vct-focus-color: #4299e1;
}
```
