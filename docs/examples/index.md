<script setup>
import { computed, ref } from 'vue'

const isDisabled = ref(false)
</script>

# Examples Gallery

A collection of real working examples and patterns for Vue Custom Tooltip. All examples below include working previews and code samples.

## Customize Display

Personalize how the examples appear by adjusting the theme and color scheme to match your preferences.

<div class="my-6 p-6 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-blue-200 dark:border-gray-600 space-y-4">
  <div class="flex gap-4 items-center flex-wrap">
    <DarkModeToggle mode="vitepress" />
    <PresetSwitcher />
  </div>
</div>

<Card>
  <div class="flex gap-4 flex-wrap">
    <Button v-tooltip.top="'Top Tooltip'" label="Top Tooltip" class="p-4! bg-blue-500! dark:bg-indigo-500! hover:bg-blue-400! dark:hover:bg-indigo-400! focus:ring-blue-300! flex-1" />
    <Button v-tooltip.bottom="'Bottom Tooltip'" label="Bottom Tooltip" class="flex-1" />
    <Button v-tooltip.left="'Left Tooltip'" label="Left Tooltip" class="flex-1" />
    <Button v-tooltip.right="'Right Tooltip'" label="Right Tooltip" class="flex-1" />
  </div>
</Card>

## Basic Examples

### Simple Text Tooltips

<Card>
  <div class="flex gap-4">
    <Button v-tooltip="'Basic tooltip'" label="Hover me" />
    <Button v-tooltip="'Long tooltip text'" label="Long text" />
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="flex gap-4">
    <Tooltip content="Basic tooltip">
      <Button label="Hover me" />
    </Tooltip>

    <Tooltip content="This tooltip has a longer message to demonstrate text wrapping in tooltips">
      <Button label="Long text" />
    </Tooltip>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="flex gap-4">
    <Button v-tooltip="'Basic tooltip'" label="Hover me" />
    <Button v-tooltip="'Long tooltip text'" label="Long text" />
  </div>
</template>
```
:::

### Rich Content Tooltips

<Card>
  <Tooltip>
    <Button label="Hover for details" />
    <template #content>
      <div class="p-2">
        <h3 class="text-lg font-bold mb-2">
          Product Details
        </h3>
        <div class="space-y-2 text-sm">
          <p>Premium quality widget</p>
          <p class="text-green-600 dark:text-green-400">
            In stock (12 available)
          </p>
          <strong class="text-lg">$99.99</strong>
        </div>
      </div>
    </template>
  </Tooltip>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <Tooltip>
    <Button label="Hover for details" />

    <template #content>
      <div class="p-2">
        <h3 class="text-lg font-bold mb-2">
          Product Details
        </h3>
        <div class="space-y-2 text-sm">
          <p>Premium quality widget</p>
          <p class="text-green-600 dark:text-green-400">
            In stock (12 available)
          </p>
          <strong class="text-lg">$99.99</strong>
        </div>
      </div>
    </template>
  </Tooltip>
</template>
```
:::

## Trigger Examples

### Different Trigger Modes

<Card>
  <div class="flex gap-4 flex-wrap">
    <Button v-tooltip.hover="'Hover only'" label="Hover" />
    <Button v-tooltip.focus="'Focus only'" label="Focus" />
    <Button v-tooltip.both="'Both hover and focus'" label="Both" />
    <Button v-tooltip.click="'Click to toggle'" label="Click" />
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="flex gap-4 flex-wrap">
    <Tooltip content="Hover only" trigger="hover">
      <Button label="Hover" />
    </Tooltip>

    <Tooltip content="Focus only (tab to me)" trigger="focus">
      <Button label="Focus" />
    </Tooltip>

    <Tooltip content="Both hover and focus" trigger="both">
      <Button label="Both" />
    </Tooltip>

    <Tooltip content="Click to toggle" trigger="click">
      <Button label="Click" />
    </Tooltip>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="flex gap-4 flex-wrap">
    <Button v-tooltip.hover="'Hover only'" label="Hover" />
    <Button v-tooltip.focus="'Focus only'" label="Focus" />
    <Button v-tooltip.both="'Both hover and focus'" label="Both" />
    <Button v-tooltip.click="'Click to toggle'" label="Click" />
  </div>
</template>
```
:::

## Positioning Examples

### Position Modifiers

<Card>
  <div class="flex gap-4 flex-wrap">
    <Button v-tooltip.top="'Top tooltip'" label="Top" />
    <Button v-tooltip.bottom="'Bottom tooltip'" label="Bottom" />
    <Button v-tooltip.left="'Left tooltip'" label="Left" />
    <Button v-tooltip.right="'Right tooltip'" label="Right" />
    <Button v-tooltip.auto="'Auto positioning'" label="Auto" />
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="flex gap-4 flex-wrap">
    <Tooltip content="Top tooltip" position="top">
      <Button label="Top" />
    </Tooltip>

    <Tooltip content="Bottom tooltip" position="bottom">
      <Button label="Bottom" />
    </Tooltip>

    <Tooltip content="Left tooltip" position="left">
      <Button label="Left" />
    </Tooltip>

    <Tooltip content="Right tooltip" position="right">
      <Button label="Right" />
    </Tooltip>

    <Tooltip content="Auto positioning" position="auto">
      <Button label="Auto" />
    </Tooltip>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="flex gap-4 flex-wrap">
    <Button v-tooltip.top="'Top tooltip'" label="Top" />
    <Button v-tooltip.bottom="'Bottom tooltip'" label="Bottom" />
    <Button v-tooltip.left="'Left tooltip'" label="Left" />
    <Button v-tooltip.right="'Right tooltip'" label="Right" />
    <Button v-tooltip.auto="'Auto positioning'" label="Auto" />
  </div>
</template>
```
:::

## Animation Speed Examples

### Fast and Slow Animations

<Card>
  <div class="flex gap-4 flex-wrap">
    <Button v-tooltip.fast="'Fast tooltip (10ms)'" label="Fast" />
    <Button v-tooltip="'Default (100ms)'" label="Default" />
    <Button v-tooltip.slow="'Slow tooltip (1000ms)'" label="Slow" />
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="flex gap-4 flex-wrap">
    <Tooltip content="Fast tooltip (10ms)" :show-delay="10" :hide-delay="50">
      <Button label="Fast" />
    </Tooltip>

    <Tooltip content="Default (100ms)" :show-delay="100" :hide-delay="100">
      <Button label="Default" />
    </Tooltip>

    <Tooltip content="Slow tooltip (1000ms)" :show-delay="1000" :hide-delay="500">
      <Button label="Slow" />
    </Tooltip>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="flex gap-4 flex-wrap">
    <Button v-tooltip.fast="'Fast tooltip (10ms)'" label="Fast" />
    <Button v-tooltip="'Default (100ms)'" label="Default" />
    <Button v-tooltip.slow="'Slow tooltip (1000ms)'" label="Slow" />
  </div>
</template>
```
:::

## Theme Examples

### Dark/Light Mode Control

<Card>
  <div class="flex gap-4 flex-wrap">
    <Button v-tooltip="'Auto dark mode'" label="Auto" />
    <Button v-tooltip.dark="'Always dark'" label="Force Dark" />
    <Button v-tooltip.light="'Always light'" label="Force Light" />
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="flex gap-4 flex-wrap">
    <Tooltip content="Auto dark mode" dark="auto">
      <Button label="Auto" />
    </Tooltip>

    <Tooltip content="Always dark" :dark="true">
      <Button label="Force Dark" />
    </Tooltip>

    <Tooltip content="Always light" :dark="false">
      <Button label="Force Light" />
    </Tooltip>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="flex gap-4 flex-wrap">
    <Button v-tooltip="'Auto dark mode'" label="Auto" />
    <Button v-tooltip.dark="'Always dark'" label="Force Dark" />
    <Button v-tooltip.light="'Always light'" label="Force Light" />
  </div>
</template>
```
:::

## Custom Styling

### Custom Styled Tooltips

<Card>
  <div class="flex gap-4 flex-wrap">
    <Tooltip
      content="Purple tooltip"
      tooltip-class="tooltip-purple"
    >
      <Button label="Purple" />
    </Tooltip>
    <Tooltip
      content="Green tooltip"
      tooltip-class="tooltip-green"
    >
      <Button label="Green" />
    </Tooltip>
    <Tooltip
      content="Gradient tooltip"
      tooltip-class="tooltip-gradient"
    >
      <Button label="Gradient" />
    </Tooltip>
    <Tooltip
      content="No arrow"
      :show-arrow="false"
      tooltip-class="tooltip-no-arrow"
    >
      <Button label="No Arrow" />
    </Tooltip>
  </div>
</Card>

<style>
.tooltip-purple .tooltip-content {
  background: #8b5cf6 !important;
  color: white !important;
}

.tooltip-purple .tooltip-arrow {
  background: #8b5cf6 !important;
  border-color: #8b5cf6 !important;
}

.tooltip-green .tooltip-content {
  background: #10b981 !important;
  color: white !important;
}

.tooltip-green .tooltip-arrow {
  background: #10b981 !important;
  border-color: #10b981 !important;
}

.tooltip-gradient .tooltip-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  border: none !important;
}

.tooltip-gradient .tooltip-arrow {
  background: #667eea !important;
  border: none !important;
}

.tooltip-no-arrow .tooltip-content {
  background: #f59e0b !important;
  color: white !important;
  border-radius: 8px !important;
}
</style>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="flex gap-4 flex-wrap">
    <Tooltip
      content="Purple tooltip"
      tooltip-class="tooltip-purple"
    >
      <Button label="Purple" />
    </Tooltip>

    <Tooltip
      content="Green tooltip"
      tooltip-class="tooltip-green"
    >
      <Button label="Green" />
    </Tooltip>

    <Tooltip
      content="Gradient tooltip"
      tooltip-class="tooltip-gradient"
    >
      <Button label="Gradient" />
    </Tooltip>

    <Tooltip
      content="No arrow"
      :show-arrow="false"
      tooltip-class="tooltip-no-arrow"
    >
      <Button label="No Arrow" />
    </Tooltip>
  </div>
</template>

<style>
.tooltip-purple .tooltip-content {
  background: #8b5cf6 !important;
  color: white !important;
}

.tooltip-purple .tooltip-arrow {
  background: #8b5cf6 !important;
  border-color: #8b5cf6 !important;
}

.tooltip-green .tooltip-content {
  background: #10b981 !important;
  color: white !important;
}

.tooltip-green .tooltip-arrow {
  background: #10b981 !important;
  border-color: #10b981 !important;
}

.tooltip-gradient .tooltip-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  border: none !important;
}

.tooltip-gradient .tooltip-arrow {
  background: #667eea !important;
  border: none !important;
}

.tooltip-no-arrow .tooltip-content {
  background: #f59e0b !important;
  color: white !important;
  border-radius: 8px !important;
}
</style>
```
:::

## Text and Inline Elements

### Tooltips on Text and Links

<Card>
  <div class="space-y-4">
    <p class="text-gray-700 dark:text-gray-300">
      This is an example of
      <span
        v-tooltip="'Helpful explanation'"
        class="underline decoration-dotted text-blue-600 dark:text-blue-400 cursor-help"
      >
        tooltip on text
      </span>
      that provides additional context.
    </p>
    <p class="text-gray-700 dark:text-gray-300">
      You can also add tooltips to
      <a
        v-tooltip="'Link description'"
        href="#"
        class="text-blue-600 dark:text-blue-400 hover:underline"
      >
        links with tooltips
      </a>
      in a text element.
    </p>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="space-y-4">
    <p class="text-gray-700 dark:text-gray-300">
      This is an example of
      <Tooltip content="Helpful explanation">
        <span class="underline decoration-dotted text-blue-600 dark:text-blue-400 cursor-help">
          tooltip on text
        </span>
      </Tooltip>
      that provides additional context.
    </p>

    <p class="text-gray-700 dark:text-gray-300">
      You can also add tooltips to
      <Tooltip content="Link description">
        <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">
          links with tooltips
        </a>
      </Tooltip>
      in a text element.
    </p>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="space-y-4">
    <p class="text-gray-700 dark:text-gray-300">
      This is an example of
      <span
        v-tooltip="'Helpful explanation'"
        class="underline decoration-dotted text-blue-600 dark:text-blue-400 cursor-help"
      >
        tooltip on text
      </span>
      that provides additional context.
    </p>

    <p class="text-gray-700 dark:text-gray-300">
      You can also add tooltips to
      <a
        v-tooltip="'Link description'"
        href="#"
        class="text-blue-600 dark:text-blue-400 hover:underline"
      >
        links with tooltips
      </a>
      in a text element.
    </p>
  </div>
</template>
```
:::

## Icons and Small Elements

### Tooltips on Icons and Badges

<Card>
  <div class="flex gap-4 items-center">
    <span v-tooltip.top="'Information'" class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm cursor-help font-bold">
      i
    </span>
    <span v-tooltip.top="'Warning'" class="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
      ⚠
    </span>
    <span v-tooltip.top="'Error'" class="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
      ✕
    </span>
    <span v-tooltip.top="'Success'" class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
      ✓
    </span>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="flex gap-4 items-center">
    <Tooltip content="Information" position="top">
      <span class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm cursor-help font-bold">
        i
      </span>
    </Tooltip>

    <Tooltip content="Warning" position="top">
      <span class="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
        ⚠
      </span>
    </Tooltip>

    <Tooltip content="Error" position="top">
      <span class="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
        ✕
      </span>
    </Tooltip>

    <Tooltip content="Success" position="top">
      <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
        ✓
      </span>
    </Tooltip>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="flex gap-4 items-center">
    <span v-tooltip.top="'Information'" class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm cursor-help font-bold">
      i
    </span>

    <span v-tooltip.top="'Warning'" class="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
      ⚠
    </span>

    <span v-tooltip.top="'Error'" class="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
      ✕
    </span>

    <span v-tooltip.top="'Success'" class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
      ✓
    </span>
  </div>
</template>
```
:::

## Disabled Tooltips

### Disabling Tooltips Conditionally

<Card>
  <div class="space-y-4">
    <div class="flex gap-4 items-center">
      <Tooltip
        content="This can be toggled"
        :disabled="isDisabled"
      >
        <Button label="Conditional" />
      </Tooltip>
      <label class="flex items-center gap-2 cursor-pointer">
        <input v-model="isDisabled" type="checkbox" />
        <span class="text-sm">Disable tooltip</span>
      </label>
    </div>
    <Tooltip
      content="Permanently disabled"
      disabled
    >
      <Button label="Always Disabled" />
    </Tooltip>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<script setup>
import { ref } from 'vue'

const isDisabled = ref(false)
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-4 items-center">
      <Tooltip
        content="This can be toggled"
        :disabled="isDisabled"
      >
        <Button label="Conditional" />
      </Tooltip>

      <label class="flex items-center gap-2 cursor-pointer">
        <input v-model="isDisabled" type="checkbox" />
        <span class="text-sm">Disable tooltip</span>
      </label>
    </div>

    <Tooltip
      content="Permanently disabled"
      disabled
    >
      <Button label="Always Disabled" />
    </Tooltip>
  </div>
</template>
```

```vue [Directive API]
<script setup>
import { ref } from 'vue'

const isDisabled = ref(false)
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-4 items-center">
      <button
        v-tooltip="isDisabled ? '' : 'Hover me'"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Dynamic
      </button>

      <label class="flex items-center gap-2 cursor-pointer">
        <input v-model="isDisabled" type="checkbox" />
        <span class="text-sm">Disable tooltip</span>
      </label>
    </div>

    <Button v-tooltip.disabled="'Will not show'" label="Always Disabled" />
  </div>
</template>
```
:::

## Combining Modifiers

### Complex Configuration

<Card>
  <div class="flex gap-4 flex-wrap">
    <Button
      v-tooltip.top.fast="'Top + Fast'"
      label="Top + Fast"
    />
    <Button
      v-tooltip.right.slow="'Right + Slow'"
      label="Right + Slow"
    />
    <Button
      v-tooltip.left.click.dark="'Left + Click + Dark'"
      label="Left + Click + Dark"
    />
    <Button
      v-tooltip.bottom.focus.light="'Bottom + Focus + Light'"
      label="Bottom + Focus + Light"
    />
    <Button
      v-tooltip.top.hover.fast="'Top + Hover + Fast'"
      label="Top + Hover + Fast"
    />
  </div>
</Card>

::: details Show code
::: code-group
```vue [Directive API]
<template>
  <div class="flex gap-4 flex-wrap">
    <Button
      v-tooltip.top.fast="'Top + Fast'"
      label="Top + Fast"
    />

    <Button
      v-tooltip.right.slow="'Right + Slow'"
      label="Right + Slow"
    />

    <Button
      v-tooltip.left.click.dark="'Left + Click + Dark'"
      label="Left + Click + Dark"
    />

    <Button
      v-tooltip.bottom.focus.light="'Bottom + Focus + Light'"
      label="Bottom + Focus + Light"
    />

    <Button
      v-tooltip.top.hover.fast="'Top + Hover + Fast'"
      label="Top + Hover + Fast"
    />
  </div>
</template>
```
:::

## More Examples

Explore more advanced examples in the dedicated sections:

- **[Form Examples](./forms.md)** - Input helpers, validation, and form-related tooltips
- **[Interactive Examples](./interactive.md)** - Click triggers, dynamic content, and coordinated tooltips
- **[Positioning Examples](./positioning.md)** - Advanced positioning strategies
- **[Accessibility Examples](./accessibility.md)** - Best practices and accessible patterns
