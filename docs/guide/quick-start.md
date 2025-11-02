# Quick Start Guide

This guide will help you get up and running with Vue Custom Tooltip quickly. We'll cover both component and directive approaches with practical examples.

## Installation

First, install the package:

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

Add to your Vue application:

```ts
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'
import { createApp } from 'vue'
import App from './App.vue'
import '@borstihd/vue-custom-tooltip/dist/style.css'

const app = createApp(App)
app.use(VueCustomTooltip)
app.mount('#app')
```

## Simple Examples

::: code-group
```vue [Basic component usage]
<template>
  <Tooltip content="This is a simple tooltip">
    <button>Hover me</button>
  </Tooltip>
</template>
```

```vue [Basic directive usage]
<template>
  <button v-tooltip="'This is a simple tooltip'">
    Hover me
  </button>
</template>
```
:::

## Common Use Cases

### 1. Icon Buttons with Tooltips

```vue
<template>
  <!-- As Component -->
  <Tooltip content="Delete item">
    <button>
      <IconTrash />
    </button>
  </Tooltip>

  <!-- As Directive -->
  <button v-tooltip.bottom="'Delete item'">
    <IconTrash />
  </button>
</template>
```

### 2. Form Input Helpers

```vue
<template>
  <!-- As Component -->
  <Tooltip content="Enter your full name">
    <input type="text" placeholder="Name">
  </Tooltip>

  <!-- As Directive -->
  <input
    v-tooltip.top.focus="'Enter your full name'"
    type="text"
    placeholder="Name"
  >
</template>
```

### 3. Rich Content Tooltip

```vue
<template>
  <Tooltip>
    <button>See details</button>

    <template #content>
      <div class="p-4">
        <h3 class="font-bold">
          Product Details
        </h3>
        <ul class="mt-2">
          <li>Feature 1</li>
          <li>Feature 2</li>
        </ul>
        <button class="mt-2 text-blue-500">
          Learn more
        </button>
      </div>
    </template>
  </Tooltip>
</template>
```

## Choosing Between Component and Directive

### Use Component When:
- You need rich HTML or slot-based content in the tooltip
- You want fine-grained control over behavior such as delays, positioning, or interactivity
- Your tooltip contains dynamic or interactive elements

### Use Directive When:
- You need simple text tooltips
- You prefer a minimal and concise syntax
- You want to apply tooltips easily to many elements, possibly via modifiers
- You appreciate lightweight integration without adding extra DOM wrappers

### How They Work Differently
- Tooltip Component: Wraps the target element with its own trigger container. Providing full slot support for the tooltip content.
- Tooltip Directive: Creates one new vue app instance, managing tooltip behavior through a shared internal instance. It modifies the element's attributes and listens to events without adding extra wrapper nodes, making it more lightweight but less flexible in terms of content complexity.

## Quick Tips

### 1. Auto Dark Mode <Badge type="info" text="default" />

```vue
<template>
  <!-- Component - no need to set it separately -->
  <Tooltip
    content="Auto dark mode"
    dark="auto"
  >
    <button>Theme aware</button>
  </Tooltip>

  <!-- Directive -->
  <button v-tooltip="'Auto dark mode'">
    Theme aware
  </button>
</template>
```

### 2. Custom Positioning

```vue
<template>
  <!-- Component -->
  <Tooltip
    content="Custom position"
    position="right"
    :offset="12"
  >
    <button>Right side</button>
  </Tooltip>

  <!-- Directive -->
  <button v-tooltip.right="'Custom position'">
    Right side
  </button>
</template>
```

### 3. Click Trigger

```vue
<template>
  <!-- Component -->
  <Tooltip
    content="Click to toggle"
    trigger="click"
  >
    <button>Click me</button>
  </Tooltip>

  <!-- Directive -->
  <button v-tooltip.click="'Click to toggle'">
    Click me
  </button>
</template>
```

## Next Steps

- [Component Usage](./component-usage.md) - Detailed component documentation
- [Directive Usage](./directive-usage.md) - Learn about directive modifiers
- [Theme Guide](../themes/overview.md) - Customize appearance
- [API Reference](../api/component.md) - Complete API documentation
