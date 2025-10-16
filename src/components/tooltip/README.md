# Tooltip Directive

A Vue 3 directive for simple tooltip functionality without the need to wrap elements.

## Global Configuration

The tooltip directive and component both support global configuration. Set defaults for all tooltips when registering the plugin:

```typescript
import { VueCustomTooltip } from '@borstihd/vue-custom-tooltip'

app.use(VueCustomTooltip, {
  globalConfig: {
    position: 'top',
    trigger: 'hover',
    showDelay: 200,
    hideDelay: 150,
    dark: true,
  }
})
```

All tooltips will use these defaults unless explicitly overridden.

## Basic Usage

```vue
<template>
  <!-- Simple text tooltip (uses global config if set) -->
  <button v-tooltip="'This is a tooltip'">
    Hover me
  </button>
</template>
```

## Modifiers

### Positioning

```vue
<template>
  <!-- Positioning with modifiers -->
  <button v-tooltip.top="'Appears on top'">
    Top
  </button>
  <button v-tooltip.bottom="'Appears on bottom'">
    Bottom
  </button>
  <button v-tooltip.left="'Appears on left'">
    Left
  </button>
  <button v-tooltip.right="'Appears on right'">
    Right
  </button>
  <button v-tooltip.auto="'Automatically positioned'">
    Auto
  </button>
</template>
```

### Trigger Behavior

```vue
<template>
  <!-- Different trigger modes -->
  <button v-tooltip.hover="'Only on hover'">
    Hover only
  </button>
  <button v-tooltip.focus="'Only on focus'">
    Focus only
  </button>
  <button v-tooltip.both="'On hover and focus'">
    Both
  </button>
  <button v-tooltip.click="'Click to toggle'">
    Click to toggle
  </button>
</template>
```

### Timing

```vue
<template>
  <!-- Timing modifiers -->
  <button v-tooltip.fast="'Fast (10ms/50ms)'">
    Fast
  </button>
  <button v-tooltip.slow="'Slow (1000ms/500ms)'">
    Slow
  </button>
</template>
```

### Disabling

```vue
<template>
  <!-- Disabled tooltip -->
  <button v-tooltip.disabled="'Will not be displayed'">
    Disabled
  </button>
</template>
```

## Object Syntax

For more complex configurations you can use an object:

```vue
<template>
  <button
    v-tooltip="{
      content: 'Custom configuration',
      position: 'top',
      trigger: 'hover',
      showDelay: 500,
      hideDelay: 100,
      maxWidth: '300px',
      offset: 12,
      disabled: false,
    }"
  >
    Custom config
  </button>
</template>
```

## Combined Modifiers

You can combine multiple modifiers:

```vue
<template>
  <!-- Position + Timing -->
  <button v-tooltip.top.fast="'Top and fast'">
    Top + Fast
  </button>

  <!-- Trigger + Position -->
  <button v-tooltip.click.left="'Click left'">
    Click + Left
  </button>

  <!-- Trigger + Timing -->
  <button v-tooltip.both.slow="'Both triggers, slow'">
    Both + Slow
  </button>
</template>
```

## Examples for Different Elements

### Form Elements

```vue
<template>
  <input
    v-tooltip.focus="'Enter your name'"
    type="text"
    placeholder="Name"
  >

  <select v-tooltip.both="'Choose an option'">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</template>
```

### Text Elements

```vue
<template>
  <p>
    This is text with a
    <span
      v-tooltip="'Helpful explanation'"
      class="underline decoration-dotted cursor-help"
    >
      tooltip
    </span>
    in the flowing text.
  </p>
</template>
```

### Icons

```vue
<template>
  <span
    v-tooltip="'Information icon'"
    class="info-icon"
  >
    ℹ
  </span>
</template>
```

## Available Options

### String Syntax
- **Value**: The tooltip text to display

### Object Syntax
- **content** (string): The text to display
- **position** ('top' | 'bottom' | 'left' | 'right' | 'auto'): Tooltip position (default: 'auto')
- **trigger** ('hover' | 'focus' | 'both' | 'click'): Trigger behavior (default: 'both')
- **showDelay** (number): Delay before showing in ms (default: 100)
- **hideDelay** (number): Delay before hiding in ms (default: 100)
- **disabled** (boolean): Tooltip disabled (default: false)
- **maxWidth** (string): Maximum width (default: '250px')
- **offset** (number): Distance to trigger element in px (default: 8)

### Modifiers
- **.top** / **.bottom** / **.left** / **.right** / **.auto**: Position
- **.hover** / **.focus** / **.both** / **.click**: Trigger behavior
- **.fast**: Fast timing (10ms/50ms)
- **.slow**: Slow timing (1000ms/500ms)
- **.disabled**: Disable tooltip

## Accessibility Features

- ✅ Keyboard navigation (Tab to focus, Escape to close)
- ✅ Screen reader compatible
- ✅ Focus management
- ✅ Support for `prefers-reduced-motion`
- ✅ High-contrast mode support
