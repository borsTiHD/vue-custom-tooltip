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
- 🎮 **Programmatic Control**: Show, hide, and toggle tooltips programmatically
- 🌙 **Theme Support**: Built-in dark mode and theme presets

## Installation

```bash
# npm
npm install @borstihd/vue-custom-tooltip

# pnpm
pnpm add @borstihd/vue-custom-tooltip

# yarn
yarn add @borstihd/vue-custom-tooltip
```

## Quick Start

```typescript
// main.ts
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
<template>
  <Tooltip content="Simple tooltip text">
    <button>Hover me</button>
  </Tooltip>
</template>
```

### Directive Usage

```vue
<template>
  <button v-tooltip="'Simple tooltip text'">
    Hover me
  </button>

  <!-- With modifiers -->
  <button v-tooltip.top.click="'Click to see tooltip'">
    Click me
  </button>
</template>
```

## Documentation

For comprehensive guides, examples, and API reference, visit the [full documentation](https://borstihd.github.io/vue-custom-tooltip/).

### Key Topics

- **[Getting Started](https://borstihd.github.io/vue-custom-tooltip/guide/getting-started)** - Installation and setup
- **[Component Usage](https://borstihd.github.io/vue-custom-tooltip/guide/component-usage)** - Detailed component API
- **[Directive Usage](https://borstihd.github.io/vue-custom-tooltip/guide/directive-usage)** - Directive modifiers and options
- **[Global Configuration](https://borstihd.github.io/vue-custom-tooltip/guide/global-config)** - Set defaults for all tooltips
- **[Themes](https://borstihd.github.io/vue-custom-tooltip/themes/overview)** - Built-in themes and customization
- **[Examples](https://borstihd.github.io/vue-custom-tooltip/examples/)** - Interactive examples and demos

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Vue 3.x

## License

MIT License - see [LICENSE](LICENSE) file for details

## Author

[borsTiHD](https://github.com/borsTiHD)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
