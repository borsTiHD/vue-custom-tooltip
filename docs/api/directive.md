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

## Best Practices

1. **Choose Wisely**: Use the directive for simple text tooltips. For rich content, use the component approach.
2. **Clear Triggers**: Make it obvious which elements have tooltips through visual cues.
3. **Concise Content**: Keep tooltip text short and informative.
4. **Position Awareness**: Consider using `.auto` for dynamic positioning.
5. **Animation Speed**: Use `.slow` for important information, `.fast` for subtle hints.
