# Tooltip Themes

This directory contains theme-specific styles for the Vue Custom Tooltip component.

## Available Themes

### Default (`default.css`)
The built-in theme that uses the component's original styles. This file is intentionally empty as the default styles are defined in the `Tooltip.vue` component itself.

**Features:**
- Light, clean design
- Subtle shadows and borders
- Automatic dark mode support
- No additional CSS loading required

**When to use:**
- When you want the original tooltip styling
- To explicitly revert from another theme
- As a fallback when no theme is specified

**Note:** Using `theme: 'default'` is equivalent to not specifying a theme at all.

### PrimeVue (`primevue.css`)
Styles inspired by PrimeVue's design system, featuring:
- Clean, modern appearance
- Material-inspired shadows
- Subtle border radius
- Dark background with high contrast text
- Smooth transitions

### Vuetify (`vuetify.css`)
Styles inspired by Vuetify's Material Design implementation, featuring:
- Material Design specifications
- Elevated shadows
- Roboto font family
- Semi-transparent backgrounds
- Precise spacing and typography

## Usage

Themes are automatically injected when you configure the plugin:

```typescript
import { createApp } from 'vue'
import { VueCustomTooltip } from 'vue-custom-tooltip'

const app = createApp(App)

// Use a specific theme
app.use(VueCustomTooltip, {
  theme: 'primevue' // or 'vuetify' or 'default'
})

// No theme (same as theme: 'default')
app.use(VueCustomTooltip)
```

## Customization

Each theme uses CSS custom properties (variables) that you can override:

### PrimeVue Theme Variables
```css
--vct-primevue-text-color
--vct-primevue-background
--vct-primevue-border-radius
--vct-primevue-font-family
--vct-primevue-text-color-light
--vct-primevue-background-light
--vct-primevue-text-color-dark
--vct-primevue-background-dark
```

### Vuetify Theme Variables
```css
--vct-vuetify-text-color
--vct-vuetify-background
--vct-vuetify-border-radius
--vct-vuetify-font-family
--vct-vuetify-text-color-light
--vct-vuetify-background-light
--vct-vuetify-text-color-dark
--vct-vuetify-background-dark
```

## Dark Mode Support

All themes support:
- Forced dark mode (`dark: true`)
- Forced light mode (`dark: false`)
- Auto detection (`dark: 'auto'`) - responds to:
  - Tailwind's `.dark` class
  - `prefers-color-scheme` media query

## Creating Custom Themes

To create a custom theme:

1. Create a new CSS file in this directory (e.g., `mytheme.css`)
2. Use the class selector `.tooltip-theme-mytheme`
3. Style the `.tooltip-content` and `.tooltip-arrow` elements
4. Support all dark mode variants
5. Add the theme name to the `TooltipTheme` type in `src/types/tooltip.ts`
6. Update the theme injection logic in `src/index.ts`

Example structure:
```css
.tooltip-theme-mytheme .tooltip-content {
  /* Your styles */
}

.tooltip-theme-mytheme .tooltip-arrow {
  /* Your styles */
}

/* Dark mode support */
.tooltip-theme-mytheme.tooltip-dark .tooltip-content {
  /* Dark mode styles */
}
```
