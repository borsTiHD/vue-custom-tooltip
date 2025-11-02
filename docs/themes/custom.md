# TODO: THIS IS NOT IMPLEMENTED YET - AN IDEA/VISION FOR THE FUTURE

# Creating Custom Themes

Vue Custom Tooltip allows you to create custom themes to match your application's design system. This guide will walk you through the process of creating and using custom themes.

## Theme Structure

A theme consists of:
1. CSS variables for customization
2. Base styles for the tooltip
3. Dark mode variants
4. Arrow styles
5. Animation definitions

## Creating a Theme

### 1. Define Theme Variables

First, define your theme's CSS custom properties:

```css
:root {
  /* Basic appearance */
  --vct-mytheme-background: #ffffff;
  --vct-mytheme-text-color: #333333;
  --vct-mytheme-border-radius: 4px;
  --vct-mytheme-padding: 8px 12px;

  /* Optional styles */
  --vct-mytheme-border: 1px solid #e0e0e0;
  --vct-mytheme-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --vct-mytheme-font-family: system-ui, sans-serif;
  --vct-mytheme-font-size: 14px;

  /* Arrow size and color */
  --vct-mytheme-arrow-size: 6px;
  --vct-mytheme-arrow-color: #ffffff;
}

/* Dark mode variants */
.dark {
  --vct-mytheme-background: #333333;
  --vct-mytheme-text-color: #ffffff;
  --vct-mytheme-border: 1px solid #4a4a4a;
  --vct-mytheme-arrow-color: #333333;
}
```

### 2. Create Theme Styles

Create a CSS file for your theme (e.g., `my-theme.css`):

```css
/* Base tooltip styles */
.v-tooltip[data-theme='mytheme'] {
  background: var(--vct-mytheme-background);
  color: var(--vct-mytheme-text-color);
  border-radius: var(--vct-mytheme-border-radius);
  padding: var(--vct-mytheme-padding);
  border: var(--vct-mytheme-border);
  box-shadow: var(--vct-mytheme-shadow);
  font-family: var(--vct-mytheme-font-family);
  font-size: var(--vct-mytheme-font-size);
}

/* Arrow styles */
.v-tooltip[data-theme='mytheme'][data-popper-placement] .v-tooltip__arrow {
  width: var(--vct-mytheme-arrow-size);
  height: var(--vct-mytheme-arrow-size);
  background: var(--vct-mytheme-arrow-color);
  border: var(--vct-mytheme-border);
}

/* Position-specific arrow styles */
.v-tooltip[data-theme='mytheme'][data-popper-placement^='top'] .v-tooltip__arrow {
  bottom: calc(-1 * var(--vct-mytheme-arrow-size) / 2);
  transform: rotate(45deg);
}

.v-tooltip[data-theme='mytheme'][data-popper-placement^='bottom'] .v-tooltip__arrow {
  top: calc(-1 * var(--vct-mytheme-arrow-size) / 2);
  transform: rotate(45deg);
}

.v-tooltip[data-theme='mytheme'][data-popper-placement^='left'] .v-tooltip__arrow {
  right: calc(-1 * var(--vct-mytheme-arrow-size) / 2);
  transform: rotate(45deg);
}

.v-tooltip[data-theme='mytheme'][data-popper-placement^='right'] .v-tooltip__arrow {
  left: calc(-1 * var(--vct-mytheme-arrow-size) / 2);
  transform: rotate(45deg);
}

/* Animation */
.v-tooltip[data-theme='mytheme'] {
  transition: opacity 0.15s ease-in-out;
}
```

## Registering Your Theme

### 1. Create Theme Module

Create a new file `my-theme.ts`:

```ts
import type { TooltipTheme } from '@borstihd/vue-custom-tooltip'
import './my-theme.css'

export const myTheme: TooltipTheme = {
  name: 'mytheme',
  darkMode: {
    auto: true,
    classSelector: '.dark'
  }
}
```

### 2. Register Theme

```ts
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import { myTheme } from './my-theme'

const app = createApp(App)

app.use(VueCustomTooltip, {
  theme: myTheme.name,
  globalConfig: {
    dark: 'auto'
  }
})

app.mount('#app')
```

## Theme Examples

### Modern Theme Example

```css
:root {
  --vct-modern-background: rgba(255, 255, 255, 0.95);
  --vct-modern-text-color: #1a1a1a;
  --vct-modern-border-radius: 8px;
  --vct-modern-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                       0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --vct-modern-border: none;
  --vct-modern-padding: 12px 16px;
  --vct-modern-font-size: 14px;
  --vct-modern-arrow-size: 8px;
}

.dark {
  --vct-modern-background: rgba(26, 26, 26, 0.95);
  --vct-modern-text-color: #ffffff;
  --vct-modern-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
                       0 2px 4px -1px rgba(0, 0, 0, 0.1);
}
```

### Glassmorphism Theme

```css
:root {
  --vct-glass-background: rgba(255, 255, 255, 0.7);
  --vct-glass-text-color: #000000;
  --vct-glass-border-radius: 16px;
  --vct-glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  --vct-glass-border: 1px solid rgba(255, 255, 255, 0.18);
  --vct-glass-backdrop-filter: blur(8px);
  --vct-glass-padding: 16px 24px;
}

.dark {
  --vct-glass-background: rgba(0, 0, 0, 0.7);
  --vct-glass-text-color: #ffffff;
  --vct-glass-border: 1px solid rgba(255, 255, 255, 0.08);
}

.v-tooltip[data-theme='glass'] {
  backdrop-filter: var(--vct-glass-backdrop-filter);
  -webkit-backdrop-filter: var(--vct-glass-backdrop-filter);
}
```

## Best Practices

1. **Namespace Variables**: Prefix CSS variables with your theme name
2. **Dark Mode Support**: Always provide dark mode variants
3. **Animation**: Keep transitions smooth and subtle
4. **Accessibility**: Ensure sufficient contrast ratios
5. **Performance**: Minimize shadow complexity for better rendering
6. **Responsive**: Use relative units when appropriate
7. **Browser Support**: Test across different browsers

## Debugging Tips

1. **Inspect Elements**: Use browser dev tools to check applied styles
2. **CSS Variables**: Verify variable values are being applied
3. **Dark Mode**: Test both light and dark variants
4. **Positioning**: Check arrow alignment in all positions
5. **Animation**: Verify transitions are smooth
