# Getting Started

Vue Custom Tooltip is a flexible and accessible tooltip solution for Vue 3 applications. It provides both component and directive approaches for adding tooltips to your elements.

## Installation

Install the package using your preferred package manager:

::: code-group
```bash [npm]
npm install @borstihd/vue-custom-tooltip
```

```bash [pnpm]
pnpm add @borstihd/vue-custom-tooltip
```

```bash [yarn]
yarn add @borstihd/vue-custom-tooltip
```
:::

## Basic Setup

Add the plugin to your Vue application:

```ts
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import '@borstihd/vue-custom-tooltip/dist/style.css'

const app = createApp(App)

// Use with default options
app.use(VueCustomTooltip)

// Alternatively, register the plugin with your own custom settings
app.use(VueCustomTooltip, {
  componentName: 'Tooltip', // Sets a custom component name
  directiveName: 'tooltip', // Defines a custom directive identifier
  theme: 'default', // Available themes: 'default', 'classic', 'vuetify', 'primevue'
  globalConfig: {}, // See global configuration section for full config options
})

app.mount('#app')
```

## Quick Example

### Component Usage

```vue
<template>
  <Tooltip content="Hello from tooltip!">
    <button>Hover me</button>
  </Tooltip>
</template>
```

### Directive Usage

```vue
<template>
  <button v-tooltip="'Hello from tooltip!'">
    Hover me
  </button>
</template>
```

## Features

- 🎯 **Component & Directive**: Use as a component or directive based on your needs
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 🎨 **Customizable**: Multiple themes, flexible positioning, styling, and content
- 📱 **Smart Positioning**: Auto-detects best position based on available space
- ⚡ **Lightweight**: Zero dependencies except Vue 3
- 📦 **TypeScript**: Full TypeScript support with type definitions
- 🎭 **Multiple Triggers**: Hover, focus, click, or combination
- ⏱️ **Configurable Delays**: Custom show/hide delays
- 🌙 **Theme Support**: Built-in dark mode and theme options

## Next Steps

- [Quick Start Guide](./quick-start.md) - More detailed examples and usage
- [Component Usage](./component-usage.md) - Learn about component-based tooltips
- [Directive Usage](./directive-usage.md) - Learn about directive-based tooltips
- [Themes](../themes/overview.md) - Explore available themes and customization
