# Directive API

The Vue Custom Tooltip directive (`v-tooltip`) provides a lightweight way to add tooltips directly to elements without wrapping components. This approach is perfect for simple text tooltips and offers a concise modifier-based configuration.

## Basic Usage

```vue
<template>
  <!-- Basic usage -->
  <button v-tooltip="'Simple tooltip'">
    Hover me
  </button>

  <!-- With modifiers -->
  <button v-tooltip.top.slow="'Tooltip on top with slow animation'">
    Top tooltip
  </button>
</template>
```

## Directive Modifiers

The directive supports various modifiers to customize tooltip behavior:

### Position Modifiers

| Modifier | Description |
|----------|-------------|
| `.top` | Position tooltip on top |
| `.bottom` | Position tooltip on bottom |
| `.left` | Position tooltip on left |
| `.right` | Position tooltip on right |
| `.auto` | Auto-detect best position (default) |

```vue
<template>
  <button v-tooltip.right="'Shows on the right'">
    Right tooltip
  </button>
</template>
```

### Trigger Modifiers

| Modifier | Description |
|----------|-------------|
| `.hover` | Show on hover only |
| `.focus` | Show on focus only |
| `.both` | Show on hover and focus (default) |
| `.click` | Toggle on click |

```vue
<template>
  <button v-tooltip.click="'Click to toggle'">
    Click me
  </button>
</template>
```

### Animation Speed Modifiers

| Modifier | Description |
|----------|-------------|
| `.fast` | Fast animation (10ms show, 50ms hide) |
| `.slow` | Slow animation (1000ms show, 500ms hide) |

```vue
<template>
  <button v-tooltip.slow="'Appears slowly'">
    Slow tooltip
  </button>
</template>
```

### Theme Modifiers

| Modifier | Description |
|----------|-------------|
| `.dark` | Always use dark theme |
| `.light` | Always use light theme |

```vue
<template>
  <button v-tooltip.dark="'Dark tooltip'">
    Dark theme
  </button>
</template>
```

### Other Modifiers

| Modifier | Description |
|----------|-------------|
| `.disabled` | Disable the tooltip |

```vue
<template>
  <button v-tooltip.disabled="'Will not show'">
    Disabled tooltip
  </button>
</template>
```

## Combining Modifiers

You can combine multiple modifiers to achieve the desired behavior:

```vue
<template>
  <!-- Top position, click trigger, dark theme -->
  <button v-tooltip.top.click.dark="'Click for dark tooltip'">
    Combined modifiers
  </button>

  <!-- Right position, slow animation, focus only -->
  <button v-tooltip.right.slow.focus="'Focus to show'">
    Multiple modifiers
  </button>
</template>
```

## Dynamic Content

The directive accepts dynamic content through Vue's binding syntax:

```vue
<script setup>
const message = ref('Dynamic tooltip content')
</script>

<template>
  <button v-tooltip="message">
    Dynamic content
  </button>
</template>
```

## Object Configuration

For more complex configurations, you can pass an object instead of a simple string. This approach provides more fine-grained control over the tooltip's behavior:

```vue
<template>
  <!-- Basic object configuration -->
  <button
    v-tooltip="{
      content: 'Custom configured tooltip',
      position: 'top',
      trigger: 'hover',
      showDelay: 500,
      hideDelay: 100,
      maxWidth: '300px',
      showArrow: false,
    }"
  >
    Custom config
  </button>

  <!-- Disabled tooltip -->
  <button
    v-tooltip="{
      content: 'Disabled tooltip',
      disabled: true,
    }"
  >
    Disabled
  </button>
</template>
```

### Available Options

| Option | Type | Default | Description |
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
| `dark` | `'auto' \| boolean` | `'auto'` | Dark mode behavior |

### Combining with Modifiers

Object configuration can still be combined with modifiers for quick overrides:

```vue
<template>
  <button
    v-tooltip.dark="{
      content: 'Dark theme with custom delay',
      showDelay: 300,
      hideDelay: 200,
    }"
  >
    Combined configuration
  </button>
</template>
```

::: tip Note
When using both modifiers and object configuration, modifiers take precedence over the object configuration for the same property.
:::

## Best Practices

1. **Choose Wisely**: Use the directive for simple text tooltips. For rich content, use the component approach.
2. **Clear Triggers**: Make it obvious which elements have tooltips through visual cues.
3. **Concise Content**: Keep tooltip text short and informative.
4. **Position Awareness**: Consider using `.auto` for dynamic positioning.
5. **Animation Speed**: Use `.slow` for important information, `.fast` for subtle hints.
