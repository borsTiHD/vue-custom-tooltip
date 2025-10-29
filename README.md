# Vue Custom Tooltip

A flexible and accessible Vue 3 tooltip component and directive with TypeScript support. Built with zero dependencies (except Vue 3), featuring automatic positioning, keyboard navigation, and full accessibility support.

## Features

- 🎯 **Component & Directive**: Use as a component or a directive (v-tooltip)
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 🎨 **Customizable**: Flexible positioning, styling, and content
- 📱 **Smart Positioning**: Auto-detects best position based on available space
- ⚡ **Lightweight**: Zero dependencies except Vue 3
- 📦 **TypeScript**: Full TypeScript support with type definitions
- 🎭 **Multiple Triggers**: Hover, focus, click, or combination
- ⏱️ **Configurable Delays**: Custom show/hide delays
- 🌙 **Theme Support**: Built-in dark mode and high contrast support

## Installation

```bash
# npm
npm install @borstihd/vue-custom-tooltip

# pnpm
pnpm add @borstihd/vue-custom-tooltip

# yarn
yarn add @borstihd/vue-custom-tooltip
```

## Usage

### Global Registration (Plugin)

```typescript
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import '@borstihd/vue-custom-tooltip/dist/style.css'

const app = createApp(App)
app.use(VueCustomTooltip)
app.mount('#app')
```

### Global Registration with Custom Defaults

You can configure global defaults for all tooltips in your application:

```typescript
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import '@borstihd/vue-custom-tooltip/dist/style.css'

const app = createApp(App)

// Configure global defaults for all tooltips
app.use(VueCustomTooltip, {
  theme: 'default', // or 'vuetify' or 'primevue'
  globalConfig: {
    position: 'top', // Default position for all tooltips
    trigger: 'hover', // Default trigger behavior
    showDelay: 200, // Default show delay (ms)
    hideDelay: 150, // Default hide delay (ms)
    dark: true, // Force dark mode for all tooltips
    showArrow: true, // Show arrow by default
    offset: 12, // Default offset from trigger
    maxWidth: '300px', // Default max width
  }
})

app.mount('#app')
```

**How it works:**
- Global configuration provides default values for all tooltips
- Individual tooltip props override global configuration
- Priority order: **Component Props > Global Config > Built-in Defaults**

**Example:**
```vue
<template>
  <!-- Uses global config (position: 'top', showDelay: 200) -->
  <Tooltip content="Uses global defaults">
    <button>Default</button>
  </Tooltip>

  <!-- Overrides position, but uses global showDelay: 200 -->
  <Tooltip content="Custom position" position="bottom">
    <button>Custom Position</button>
  </Tooltip>

  <!-- Overrides both position and showDelay -->
  <Tooltip content="All custom" position="right" :show-delay="0">
    <button>All Custom</button>
  </Tooltip>
</template>
```

### Component Usage

```vue
<script setup lang="ts">
import { Tooltip } from '@borstihd/vue-custom-tooltip'
import '@borstihd/vue-custom-tooltip/dist/style.css'
</script>

<template>
  <!-- Basic usage -->
  <Tooltip content="Simple tooltip text">
    <button>Hover me</button>
  </Tooltip>

  <!-- With custom positioning -->
  <Tooltip content="I'm on the right" position="right">
    <button>Right tooltip</button>
  </Tooltip>

  <!-- Click trigger -->
  <Tooltip content="Click to toggle" trigger="click">
    <button>Click me</button>
  </Tooltip>

  <!-- Rich content with slots -->
  <Tooltip>
    <button>Rich content</button>
    <template #content>
      <div class="space-y-2">
        <h4>Rich Tooltip</h4>
        <p>With <strong>formatted</strong> content</p>
      </div>
    </template>
  </Tooltip>
</template>
```

### Directive Usage

The `v-tooltip` directive also respects global configuration. Any modifiers or configuration you pass to the directive will override the global defaults.

```vue
<script setup lang="ts">
import { vTooltip } from '@borstihd/vue-custom-tooltip'
import '@borstihd/vue-custom-tooltip/dist/style.css'
</script>

<template>
  <!-- Simple text (uses global config if set) -->
  <button v-tooltip="'Tooltip text'">
    Hover me
  </button>

  <!-- With modifiers (overrides global config) -->
  <button v-tooltip.top.click="'Click me'">
    Top tooltip on click
  </button>

  <!-- With configuration object (overrides global config) -->
  <button v-tooltip="{ content: 'Custom', position: 'right', showDelay: 0 }">
    Fast tooltip
  </button>

  <!-- Available modifiers -->
  <button v-tooltip.top="'Top'">
    Top
  </button>
  <button v-tooltip.bottom="'Bottom'">
    Bottom
  </button>
  <button v-tooltip.left="'Left'">
    Left
  </button>
  <button v-tooltip.right="'Right'">
    Right
  </button>
  <button v-tooltip.auto="'Auto'">
    Auto-position
  </button>

  <!-- Trigger modifiers -->
  <button v-tooltip.hover="'Hover only'">
    Hover
  </button>
  <button v-tooltip.focus="'Focus only'">
    Focus
  </button>
  <button v-tooltip.both="'Hover and focus'">
    Both
  </button>
  <button v-tooltip.click="'Click to toggle'">
    Click
  </button>

  <!-- Timing modifiers -->
  <button v-tooltip.fast="'Fast'">
    Fast (10ms delay)
  </button>
  <button v-tooltip.slow="'Slow'">
    Slow (1000ms delay)
  </button>
</template>
```

## API

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `undefined` | Text content for the tooltip |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'auto'` | `'auto'` | Position relative to trigger |
| `trigger` | `'hover' \| 'focus' \| 'both' \| 'click'` | `'both'` | How to trigger the tooltip |
| `showDelay` | `number` | `100` | Delay before showing (ms) |
| `hideDelay` | `number` | `100` | Delay before hiding (ms) |
| `disabled` | `boolean` | `false` | Disable the tooltip |
| `maxWidth` | `string` | `'250px'` | Maximum width of tooltip |
| `tooltipClass` | `string` | `''` | Custom CSS class |
| `showArrow` | `boolean` | `true` | Show arrow pointer |
| `offset` | `number` | `8` | Offset from trigger (px) |
| `dark` | `'auto' \| boolean` | `'auto'` | Dark mode behavior (see below) |

#### Dark Mode Options

The `dark` prop controls the tooltip's appearance in dark environments:

- **`'auto'`** (default): Automatically detects dark mode using **both** CSS `prefers-color-scheme: dark` media query **and** Tailwind's `.dark` class. This is the recommended setting for most use cases.
- **`true`**: Always use dark theme, regardless of system or class-based settings
- **`false`**: Always use light theme, regardless of system or class-based settings

**Examples:**
```vue
<!-- Auto-detect (recommended) - works with both OS dark mode and Tailwind -->
<Tooltip content="Auto dark mode" dark="auto">
  <button>Hover me</button>
</Tooltip>

<!-- Always dark -->
<Tooltip content="Always dark" :dark="true">
  <button>Dark tooltip</button>
</Tooltip>

<!-- Always light -->
<Tooltip content="Always light" :dark="false">
  <button>Light tooltip</button>
</Tooltip>
```

### Component Slots

| Slot | Description |
|------|-------------|
| `default` | The trigger element |
| `content` | Rich content for the tooltip (alternative to `content` prop) |

### Directive Modifiers

| Modifier | Description |
|----------|-------------|
| `.top` | Position tooltip on top |
| `.bottom` | Position tooltip on bottom |
| `.left` | Position tooltip on left |
| `.right` | Position tooltip on right |
| `.auto` | Auto-detect best position |
| `.hover` | Show on hover only |
| `.focus` | Show on focus only |
| `.both` | Show on hover and focus |
| `.click` | Toggle on click |
| `.fast` | Fast animation (10ms show, 50ms hide) |
| `.slow` | Slow animation (1000ms show, 500ms hide) |
| `.disabled` | Disable the tooltip |
| `.dark` | Always use dark theme |
| `.light` | Always use light theme |

**Example with forced dark mode:**
```vue
<button v-tooltip.dark="'Always dark tooltip'">
  Hover me
</button>

<button v-tooltip.light="'Always light tooltip'">
  Or me
</button>
```

## Advanced Configuration

### Runtime Configuration Management

You can programmatically manage global configuration at runtime:

```typescript
import {
  getTooltipGlobalConfig,
  resetTooltipGlobalConfig,
  setTooltipGlobalConfig
} from '@borstihd/vue-custom-tooltip'

// Set or update global configuration
setTooltipGlobalConfig({
  position: 'bottom',
  showDelay: 300,
  dark: true
})

// Get current global configuration
const currentConfig = getTooltipGlobalConfig()
console.log(currentConfig)

// Reset to no global configuration
resetTooltipGlobalConfig()
```

## TypeScript

The package includes full TypeScript support with type definitions for props, slots, globally registered components and directives.

### Type Imports

```typescript
import type { TooltipProps, TooltipSlots } from '@borstihd/vue-custom-tooltip'
```

### Global Component Types

When you install the plugin using `app.use(VueCustomTooltip)`, the `Tooltip` component is automatically registered globally and TypeScript will recognize it in your templates with full autocomplete and type checking.

**No additional configuration needed!** The package includes Vue component type augmentation, so your IDE will provide:
- ✅ Prop autocomplete for `<Tooltip>`
- ✅ Type checking for prop values
- ✅ IntelliSense documentation

**Example:**
```vue
<template>
  <!-- TypeScript knows about these props and validates them -->
  <Tooltip
    content="Hello"
    position="top"
    :show-delay="200"
  >
    <button>Hover me</button>
  </Tooltip>
</template>
```

**Note for local imports:** If you import the component directly instead of using the plugin, you'll need to import it explicitly:

```vue
<script setup lang="ts">
import { Tooltip } from '@borstihd/vue-custom-tooltip'
</script>

<template>
  <Tooltip content="Hello">
    <button>Hover me</button>
  </Tooltip>
</template>
```

### Global Directive Types

The `v-tooltip` directive is also fully typed when you install the plugin. TypeScript will recognize the directive and validate its modifiers.

**Available modifiers with full type support:**
- ✅ Position modifiers: `.top`, `.bottom`, `.left`, `.right`, `.auto`
- ✅ Trigger modifiers: `.hover`, `.focus`, `.both`, `.click`
- ✅ Timing modifiers: `.fast`, `.slow`
- ✅ Theme modifiers: `.dark`, `.light`

**Example:**
```vue
<template>
  <!-- TypeScript validates these modifiers -->
  <button v-tooltip.top.fast="'Quick tooltip'">
    Hover me
  </button>

  <!-- Object syntax with full type checking -->
  <button v-tooltip="{ content: 'Hello', position: 'right' }">
    Click me
  </button>
</template>
```

## Theme Presets

Vue Custom Tooltip supports built-in theme presets for easy integration with popular UI frameworks, as well as a default theme:

- **default**: Uses the component's original built-in styles (no extra CSS loaded)
- **primevue**: Styles inspired by PrimeVue's design system
- **vuetify**: Styles inspired by Vuetify's Material Design implementation

You can select a theme globally when registering the plugin:

```typescript
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import '@borstihd/vue-custom-tooltip/dist/style.css'

const app = createApp(App)

// Use a theme preset
app.use(VueCustomTooltip, {
  theme: 'primevue' // or 'vuetify' or 'default'
})

// The default theme is used if you omit the theme option:
app.use(VueCustomTooltip) // same as theme: 'default'

app.mount('#app')
```

You can also switch themes at runtime:

```typescript
import { setTooltipGlobalTheme } from '@borstihd/vue-custom-tooltip'

setTooltipGlobalTheme('vuetify') // Switch to Vuetify theme
setTooltipGlobalTheme('default') // Revert to default styles
```

### Customizing Theme Styles

Each theme uses CSS custom properties (variables) for easy customization. You can override these in your global CSS:

```css
:root {
  /* Example for PrimeVue theme */
  --vct-primevue-background: #1a1a1a;
  --vct-primevue-text-color: #fff;
  --vct-primevue-border-radius: 8px;
}
```

See the [src/styles/themes/README.md](src/styles/themes/README.md) for a full list of theme variables and instructions for creating your own custom themes.

## Styling

The tooltip uses CSS custom properties for theming. You can customize the appearance by overriding these variables:

```css
:root {
  /* Focus outline color for keyboard navigation */
  --vct-focus-color: #3b82f6;

  /* Tooltip text color */
  --vct-text-color: #374151;

  /* Tooltip background color */
  --vct-background: #ffffff;

  /* Tooltip border color */
  --vct-border-color: #d1d5db;

  /* Tooltip border radius */
  --vct-border-radius: 8px;

  /* Dark mode colors (optional, used when dark="auto" or dark={true}) */
  --vct-text-color-dark: #e0e0e0;
  --vct-background-dark: #2a2a2a;
  --vct-border-color-dark: #444444;
}
```

### Custom Theme Example

```css
/* Dark theme example */
:root {
  --vct-text-color: #e0e0e0;
  --vct-background: #2a2a2a;
  --vct-border-color: #444444;
  --vct-border-radius: 12px;
  --vct-focus-color: #60a5fa;
}

/* Or scope to specific components */
.my-custom-tooltips {
  --vct-background: #1e40af;
  --vct-text-color: white;
  --vct-border-color: #1e3a8a;
}
```

### Tailwind CSS Integration

The tooltip automatically detects Tailwind's dark mode when using `dark="auto"` (default):

```vue
<script setup lang="ts">
import { Tooltip } from '@borstihd/vue-custom-tooltip'
</script>

<template>
  <!-- Automatically works with Tailwind's dark mode -->
  <Tooltip content="I automatically adapt to Tailwind's dark mode!">
    <button>Hover me</button>
  </Tooltip>
</template>
```

**How it works:**
- When `dark="auto"` (default), the tooltip responds to **both** the system's `prefers-color-scheme: dark` **and** Tailwind's `.dark` class
- No additional configuration needed - just ensure your `tailwind.config.js` uses class-based dark mode:

```js
module.exports = {
  darkMode: 'class', // or 'selector'
  // ... rest of config
}
```

**Note**: The package is completely independent and does not rely on any other UI library (like PrimeVue, Element Plus, or similar). All CSS variables have sensible defaults, so the tooltips work out-of-the-box without any configuration.

## Accessibility

- ✅ Keyboard navigation (Tab, Escape)
- ✅ Screen reader compatible
- ✅ ARIA attributes
- ✅ Focus management
- ✅ Reduced motion support
- ✅ High contrast mode support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Vue 3.x

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build library
pnpm build

# Run tests
pnpm test:unit

# Lint
pnpm lint
```

## License

MIT License - see LICENSE file for details

## Author

borsTiHD

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
