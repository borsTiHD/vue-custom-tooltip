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

```vue
<script setup lang="ts">
import { vTooltip } from '@borstihd/vue-custom-tooltip'
import '@borstihd/vue-custom-tooltip/dist/style.css'
</script>

<template>
  <!-- Simple text -->
  <button v-tooltip="'Tooltip text'">
    Hover me
  </button>

  <!-- With modifiers -->
  <button v-tooltip.top.click="'Click me'">
    Top tooltip on click
  </button>

  <!-- With configuration object -->
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

## TypeScript

The package includes full TypeScript support:

```typescript
import type { TooltipProps, TooltipSlots } from '@borstihd/vue-custom-tooltip'
```

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
