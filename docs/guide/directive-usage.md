# Directive Usage Guide

The `v-tooltip` directive provides a lightweight and concise way to add tooltips to elements. It's perfect for simple text tooltips and offers a modifier-based configuration system.

::: info
See the API section for a complete list of available modifiers.
:::

## Basic Usage

Add tooltips directly to elements using the `v-tooltip` directive:

```vue
<template>
  <!-- Basic usage -->
  <button v-tooltip="'Simple tooltip'">
    Hover me
  </button>

  <!-- With modifiers -->
  <button v-tooltip.top.slow="'Top tooltip with slow animation'">
    Hover me
  </button>
</template>
```

## Position Modifiers

Control tooltip placement using position modifiers:

```vue
<template>
  <!-- Auto positioning (default) -->
  <button v-tooltip.auto="'Auto-positioned tooltip'">
    Auto
  </button>

  <!-- Different positions -->
  <button v-tooltip.top="'Top tooltip'">
    Top
  </button>
  <button v-tooltip.bottom="'Bottom tooltip'">
    Bottom
  </button>
  <button v-tooltip.left="'Left tooltip'">
    Left
  </button>
  <button v-tooltip.right="'Right tooltip'">
    Right
  </button>
</template>
```

## Trigger Modifiers

Customize how tooltips are triggered:

```vue
<template>
  <!-- Both hover and focus (default) -->
  <button v-tooltip.both="'Shows on hover or focus'">
    Default trigger
  </button>

  <!-- Hover only -->
  <button v-tooltip.hover="'Shows on hover'">
    Hover trigger
  </button>

  <!-- Focus only (great for form inputs) -->
  <input
    v-tooltip.focus="'Shows on focus'"
    placeholder="Focus trigger"
  >

  <!-- Click to toggle -->
  <button v-tooltip.click="'Click to toggle'">
    Click trigger
  </button>
</template>
```

## Animation Speed Modifiers

Adjust animation timing:

```vue
<template>
  <!-- Fast animations -->
  <button v-tooltip.fast="'Quick to show/hide'">
    Fast
  </button>

  <!-- Slow animations -->
  <button v-tooltip.slow="'Gentle transitions'">
    Slow
  </button>
</template>
```

::: info Animation Speeds
- `.fast`: 10ms show, 50ms hide
- `.slow`: 1000ms show, 500ms hide
- Default: 100ms show/hide
:::

## Theme Modifiers

Control light/dark theme:

```vue
<template>
  <!-- Force dark theme -->
  <button v-tooltip.dark="'Always dark'">
    Dark theme
  </button>

  <!-- Force light theme -->
  <button v-tooltip.light="'Always light'">
    Light theme
  </button>

  <!-- Auto theme (default) -->
  <button v-tooltip="'System/class based theme'">
    Auto theme
  </button>
</template>
```

## Combining Modifiers

Mix and match modifiers for precise control:

```vue
<template>
  <!-- Position + Speed -->
  <button v-tooltip.top.fast="'Quick top tooltip'">
    Combined 1
  </button>

  <!-- Position + Trigger + Theme -->
  <button v-tooltip.right.click.dark="'Dark click tooltip'">
    Combined 2
  </button>

  <!-- All together -->
  <button v-tooltip.bottom.focus.slow.light="'Kitchen sink'">
    Combined 3
  </button>
</template>
```

## Common Use Cases

### Form Inputs

```vue
<template>
  <div class="form-group">
    <input
      v-tooltip.top.focus="'Must be at least 8 characters'"
      type="password"
      placeholder="Password"
    >

    <input
      v-tooltip.top.focus.slow="'Enter your email address'"
      type="email"
      placeholder="Email"
    >
  </div>
</template>
```

### Icon Buttons

```vue
<template>
  <div class="toolbar">
    <button v-tooltip.bottom="'Save changes'">
      <IconSave />
    </button>

    <button v-tooltip.bottom.click.dark="'More options'">
      <IconMenu />
    </button>
  </div>
</template>
```

### Navigation Items

```vue
<template>
  <nav>
    <a
      v-tooltip.right="'Go to dashboard'"
      href="/dashboard"
    >
      <IconHome />
    </a>

    <a
      v-tooltip.right.slow="'View profile'"
      href="/profile"
    >
      <IconUser />
    </a>
  </nav>
</template>
```

### Disabled Elements

```vue
<template>
  <button
    v-tooltip.top="'Feature not available'"
    disabled
  >
    Unavailable
  </button>

  <button
    v-tooltip.disabled="'Will not show'"
    disabled
  >
    No tooltip
  </button>
</template>
```

## Dynamic Content

The directive supports dynamic content:

```vue
<script setup>
const message = ref('Dynamic tooltip content')
const getTooltip = id => `Item ${id} tooltip`
</script>

<template>
  <!-- Reactive reference -->
  <button v-tooltip="message">
    Dynamic content
  </button>

  <!-- Computed content -->
  <button v-tooltip="getTooltip(item.id)">
    Dynamic function
  </button>
</template>
```

## Best Practices

1. **Keep it Simple**: Use the directive for simple text tooltips
2. **Clear Triggers**: Make it obvious which elements have tooltips
3. **Appropriate Timing**: Use `.slow` for important info, `.fast` for hints
4. **Position Awareness**: Consider using `.auto` for dynamic layouts (default)
5. **Accessibility**: Ensure trigger elements are focusable
6. **Content Length**: Keep tooltip text concise and clear
7. **Rich Content**: Switch to component API for complex content

## Modifier Reference

| Category | Modifier | Description |
|----------|----------|-------------|
| Position | `.top` | Position on top |
| | `.bottom` | Position on bottom |
| | `.left` | Position on left |
| | `.right` | Position on right |
| | `.auto` | Auto-detect position |
| Trigger | `.hover` | Show on hover |
| | `.focus` | Show on focus |
| | `.both` | Show on hover/focus |
| | `.click` | Toggle on click |
| Speed | `.fast` | Quick animations |
| | `.slow` | Slow animations |
| Theme | `.dark` | Force dark theme |
| | `.light` | Force light theme |
| State | `.disabled` | Disable tooltip |

## Next Steps

- [Component Usage](./component-usage.md) - Learn about the component API
- [Global Configuration](./global-config.md) - Configure default behavior
