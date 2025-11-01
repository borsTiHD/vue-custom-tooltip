# Component Usage

The Vue Custom Tooltip component offers a flexible way to add tooltips to any element using a wrapper approach. This method is ideal when you need rich content, complex positioning, or extensive customization.

::: info
See the API section for a complete list of available modifiers.
:::

## Basic Usage

To use the tooltip component, wrap any element with the `<Tooltip>` component:

::: tip
If you register the plugin, the component becomes globally available throughout your project, so there is no need to import it separately.
:::

```vue
<script setup>
import { Tooltip } from '@borstihd/vue-custom-tooltip'
import '@borstihd/vue-custom-tooltip/dist/style.css'
</script>

<template>
  <Tooltip content="Simple tooltip text">
    <button>Hover me</button>
  </Tooltip>
</template>
```

## Rich Content

Use the content slot for rich HTML content:

```vue
<template>
  <Tooltip>
    <button>Hover for rich content</button>

    <template #content>
      <div class="tooltip-content">
        <h3>Rich Content</h3>
        <p>This tooltip contains <strong>HTML</strong>!</p>
        <button @click="doSomething">
          Click me
        </button>
      </div>
    </template>
  </Tooltip>
</template>
```

## Positioning

Control tooltip position using the `position` prop:

```vue
<template>
  <!-- Auto positioning (default) -->
  <Tooltip
    content="Automatically positioned"
    position="auto"
  >
    <button>Auto position</button>
  </Tooltip>

  <!-- Fixed positions -->
  <Tooltip content="Top tooltip" position="top">
    <button>Top</button>
  </Tooltip>

  <Tooltip content="Bottom tooltip" position="bottom">
    <button>Bottom</button>
  </Tooltip>

  <Tooltip content="Left tooltip" position="left">
    <button>Left</button>
  </Tooltip>

  <Tooltip content="Right tooltip" position="right">
    <button>Right</button>
  </Tooltip>
</template>
```

## Trigger Modes

Choose how the tooltip is triggered:

```vue
<template>
  <!-- Both hover and focus (default) -->
  <Tooltip
    content="Hover or focus"
    trigger="both"
  >
    <button>Hover or focus</button>
  </Tooltip>

  <!-- Hover only -->
  <Tooltip
    content="Hover tooltip"
    trigger="hover"
  >
    <button>Hover me</button>
  </Tooltip>

  <!-- Focus only -->
  <Tooltip
    content="Focus tooltip"
    trigger="focus"
  >
    <button>Focus me</button>
  </Tooltip>

  <!-- Click to toggle -->
  <Tooltip
    content="Click tooltip"
    trigger="click"
  >
    <button>Click me</button>
  </Tooltip>
</template>
```

## Animation Delays

Customize show/hide delays in ms:

```vue
<template>
  <Tooltip
    content="Custom timing"
    :show-delay="500"
    :hide-delay="100"
  >
    <button>Custom timing</button>
  </Tooltip>
</template>
```

## Disabled

You can easily disable the tooltip by setting the `disabled` prop to `true`:

```vue
<template>
  <Tooltip
    content="This tooltip is disabled"
    :disabled="true"
  >
    <button>No tooltip will be shown</button>
  </Tooltip>
</template>
```

## Styling

Apply custom classes and control the arrow:

```vue
<template>
  <Tooltip
    content="Custom styled tooltip"
    tooltip-class="my-custom-tooltip"
    :show-arrow="false"
  >
    <button>Custom style</button>
  </Tooltip>
</template>

<style>
.my-custom-tooltip {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
```

### Gradient styling

Here we applied stylings to the content and the arrow.

```vue
<template>
  <Tooltip
    content="Custom styled tooltip"
    tooltip-class="my-gradient-tooltip"
  >
    <button>Gradient style</button>
  </Tooltip>
</template>

<style>
.my-gradient-tooltip .tooltip-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  border: none !important;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4) !important;
}

.my-gradient-tooltip .tooltip-arrow {
  background: #667eea !important;
  border: none !important;
}
</style>
```

## Dark Mode

Control dark mode behavior:

::: info
The default `auto` mode responds to the system preference using the `prefers-color-scheme` media query or detects the `.dark` class from Tailwind CSS.
:::

```vue
<template>
  <!-- Auto dark mode (default) -->
  <Tooltip
    content="Auto dark mode"
    dark="auto"
  >
    <button>Auto dark</button>
  </Tooltip>

  <!-- Force dark theme -->
  <Tooltip
    content="Always dark"
    :dark="true"
  >
    <button>Dark</button>
  </Tooltip>

  <!-- Force light theme -->
  <Tooltip
    content="Always light"
    :dark="false"
  >
    <button>Light</button>
  </Tooltip>
</template>
```

## Common Examples

### Form Input Helper

```vue
<template>
  <div class="form-group">
    <Tooltip content="Must be at least 8 characters">
      <input
        type="password"
        placeholder="Enter password"
      >
    </Tooltip>
  </div>
</template>
```

### Icon Button

```vue
<template>
  <Tooltip content="Delete item">
    <button class="icon-button">
      <IconTrash />
    </button>
  </Tooltip>
</template>
```

### Navigation Menu

```vue
<template>
  <nav class="navigation">
    <Tooltip content="Home">
      <a href="/">
        <IconHome />
      </a>
    </Tooltip>

    <Tooltip content="Settings">
      <a href="/settings">
        <IconSettings />
      </a>
    </Tooltip>

    <Tooltip
      position="bottom"
      content="Your profile"
    >
      <a href="/profile">
        <IconUser />
      </a>
    </Tooltip>
  </nav>
</template>
```

## Best Practices

1. **Use Auto-positioning**: Prefer `position="auto"` to ensure tooltips remain visible (default).
2. **Appropriate Delays**: Add small delays to prevent accidental triggers.
3. **Rich Content**: Use slots for complex content, props for simple text.
4. **Dark Mode**: Use `dark="auto"` for system-aware theming (default).
5. **Accessibility**: Ensure trigger elements are focusable.
