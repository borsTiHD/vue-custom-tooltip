<script setup>
import { computed, ref, useTemplateRef } from 'vue'
import { TooltipControl } from '@/index'

// Example for "Position Aware Based on Viewport"
const position = ref({ x: 0, y: 0 })
const boxWidth = ref(0)

const tooltipPosition = computed(() => {
  const centerX = boxWidth.value / 2
  const { x } = position.value
  return x > centerX ? 'top' : 'bottom'
})

const tooltipContent = computed(() => {
  const direction = tooltipPosition.value === 'top' ? 'Right half' : 'Left half'
  return `${direction} - Pointing ${tooltipPosition.value}`
})

function updatePosition(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  boxWidth.value = rect.width
  position.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
  TooltipControl.show('controlled-tooltip')
}
</script>

# Positioning Examples

Examples demonstrating different positioning strategies and responsive tooltip placement techniques.

## Fixed Positioning

### All Positions

<Card>
  <div class="space-y-8">
    <!-- Top Section -->
    <div class="flex justify-center">
      <Button v-tooltip.top="'I appear on top'" label="Top" />
    </div>
    <!-- Middle Section -->
    <div class="flex justify-between items-center">
      <Button v-tooltip.left="'I appear on the left'" label="Left" />
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Fixed Positions
        </p>
      </div>
      <Button v-tooltip.right="'I appear on the right'" label="Right" />
    </div>
    <!-- Bottom Section -->
    <div class="flex justify-center">
      <Button v-tooltip.bottom="'I appear on bottom'" label="Bottom" />
    </div>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="space-y-8">
    <!-- Top Section -->
    <div class="flex justify-center">
      <Tooltip content="I appear on top" position="top">
        <Button label="Top" />
      </Tooltip>
    </div>

    <!-- Middle Section -->
    <div class="flex justify-between items-center">
      <Tooltip content="I appear on the left" position="left">
        <Button label="Left" />
      </Tooltip>

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Fixed Positions
        </p>
      </div>

      <Tooltip content="I appear on the right" position="right">
        <Button label="Right" />
      </Tooltip>
    </div>

    <!-- Bottom Section -->
    <div class="flex justify-center">
      <Tooltip content="I appear on bottom" position="bottom">
        <Button label="Bottom" />
      </Tooltip>
    </div>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="space-y-8">
    <!-- Top Section -->
    <div class="flex justify-center">
      <Button v-tooltip.top="'I appear on top'" label="Top" />
    </div>

    <!-- Middle Section -->
    <div class="flex justify-between items-center">
      <Button v-tooltip.left="'I appear on the left'" label="Left" />

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Fixed Positions
        </p>
      </div>

      <Button v-tooltip.right="'I appear on the right'" label="Right" />
    </div>

    <!-- Bottom Section -->
    <div class="flex justify-center">
      <Button v-tooltip.bottom="'I appear on bottom'" label="Bottom" />
    </div>
  </div>
</template>
```
:::

## Auto-Positioning

### Smart Placement

<Card>
  <div class="space-y-4">
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Try hovering over the buttons, when there is not enough space. Auto-positioning will place the tooltip where there's most space.
    </p>
    <div class="flex gap-4 flex-wrap">
      <Button v-tooltip.auto="'Auto-positioned tooltip'" label="Auto 1" />
      <Button v-tooltip.auto="'Another auto-positioned tooltip'" label="Auto 2" />
      <Button v-tooltip.auto="'Third auto-positioned tooltip'" label="Auto 3" />
      <Button v-tooltip.auto="'Fourth auto-positioned tooltip'" label="Auto 4" />
    </div>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="space-y-4">
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Try hovering over the buttons, when there is not enough space. Auto-positioning will place the tooltip where there's most space.
    </p>

    <div class="flex gap-4 flex-wrap">
      <Tooltip content="Auto-positioned tooltip" position="auto">
        <Button label="Auto 1" />
      </Tooltip>

      <Tooltip content="Another auto-positioned tooltip" position="auto">
        <Button label="Auto 2" />
      </Tooltip>

      <Tooltip content="Third auto-positioned tooltip" position="auto">
        <Button label="Auto 3" />
      </Tooltip>

      <Tooltip content="Fourth auto-positioned tooltip" position="auto">
        <Button label="Auto 4" />
      </Tooltip>
    </div>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="space-y-4">
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Try hovering over the buttons. Auto-positioning will place the tooltip where there's most space.
    </p>

    <div class="flex gap-4 flex-wrap">
      <Button v-tooltip.auto="'Auto-positioned tooltip'" label="Auto 1" />
      <Button v-tooltip.auto="'Another auto-positioned tooltip'" label="Auto 2" />
      <Button v-tooltip.auto="'Third auto-positioned tooltip'" label="Auto 3" />
      <Button v-tooltip.auto="'Fourth auto-positioned tooltip'" label="Auto 4" />
    </div>
  </div>
</template>
```
:::

## Dynamic Positioning

### Position Aware Based on Viewport

This is controlled programmatically.

<div class="bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
  <div
    class="relative h-96"
    @mousemove="updatePosition"
  >
    <div
      v-tooltip="{ position: tooltipPosition, content: tooltipContent, id: 'controlled-tooltip' }"
      class="absolute w-4 h-4 bg-blue-500 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-lg"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }"
    />
    <p class="absolute bottom-4 left-4 text-xs text-gray-600 dark:text-gray-400">
      Move your mouse inside the box
    </p>
  </div>
</div>

::: details Show code
::: code-group
```vue [Directive API]
<script setup>
import { computed, ref, useTemplateRef } from 'vue'
import { TooltipControl } from '@/index'

const position = ref({ x: 0, y: 0 })
const boxWidth = ref(0)

const tooltipPosition = computed(() => {
  const centerX = boxWidth.value / 2
  const { x } = position.value
  return x > centerX ? 'top' : 'bottom'
})

const tooltipContent = computed(() => {
  const direction = tooltipPosition.value === 'top' ? 'Right half' : 'Left half'
  return `${direction} - Pointing ${tooltipPosition.value}`
})

function updatePosition(event) {
  TooltipControl.hide('controlled-tooltip')
  const rect = event.currentTarget.getBoundingClientRect()
  boxWidth.value = rect.width
  position.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
  TooltipControl.show('controlled-tooltip')
}
</script>

<template>
  <div
    class="relative h-96"
    @mousemove="updatePosition"
  >
    <div
      v-tooltip="{ position: tooltipPosition, content: tooltipContent, id: 'controlled-tooltip' }"
      class="absolute w-4 h-4 bg-blue-500 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-lg"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }"
    />
    <p class="absolute bottom-4 left-4 text-xs text-gray-600 dark:text-gray-400">
      Move your mouse inside the box
    </p>
  </div>
</template>
```
:::

## Offset Variations

### Different Offset Distances

<Card>
  <div class="space-y-6">
    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Small offset (4px)
      </p>
      <Tooltip content="Close to element" position="top" :offset="4">
        <Button label="Offset 4px" />
      </Tooltip>
    </div>
    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Default offset (8px)
      </p>
      <Tooltip content="Default distance" position="top" :offset="8">
        <Button label="Offset 8px (default)" />
      </Tooltip>
    </div>
    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Large offset (16px)
      </p>
      <Tooltip content="Far from element" position="top" :offset="16">
        <Button label="Offset 16px" />
      </Tooltip>
    </div>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="space-y-6">
    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Small offset (4px)
      </p>
      <Tooltip content="Close to element" position="top" :offset="4">
        <Button label="Offset 4px" />
      </Tooltip>
    </div>

    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Default offset (8px)
      </p>
      <Tooltip content="Default distance" position="top" :offset="8">
        <Button label="Offset 8px (default)" />
      </Tooltip>
    </div>

    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Large offset (16px)
      </p>
      <Tooltip content="Far from element" position="top" :offset="16">
        <Button label="Offset 16px" />
      </Tooltip>
    </div>
  </div>
</template>
```
:::

## Max Width Examples

### Text Wrapping at Different Widths

<Card>
  <div class="space-y-6">
    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Narrow tooltip (150px)
      </p>
      <Tooltip
        content="This is a long tooltip message that will wrap at a narrow width to demonstrate text wrapping behavior"
        position="top"
        max-width="150px"
      >
        <Button label="Narrow" />
      </Tooltip>
    </div>
    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Default tooltip (250px)
      </p>
      <Tooltip
        content="This is a long tooltip message that will wrap at the default width to demonstrate text wrapping behavior"
        position="top"
        max-width="250px"
      >
        <Button label="Default" />
      </Tooltip>
    </div>
    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Wide tooltip (400px)
      </p>
      <Tooltip
        content="This is a long tooltip message that will wrap at a wider width to demonstrate text wrapping behavior and readability across different maximum widths"
        position="top"
        max-width="400px"
      >
        <Button label="Wide" />
      </Tooltip>
    </div>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="space-y-6">
    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Narrow tooltip (150px)
      </p>
      <Tooltip
        content="This is a long tooltip message that will wrap at a narrow width to demonstrate text wrapping behavior"
        position="top"
        max-width="150px"
      >
        <Button label="Narrow" />
      </Tooltip>
    </div>

    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Default tooltip (250px)
      </p>
      <Tooltip
        content="This is a long tooltip message that will wrap at the default width to demonstrate text wrapping behavior"
        position="top"
        max-width="250px"
      >
        <Button label="Default" />
      </Tooltip>
    </div>

    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Wide tooltip (400px)
      </p>
      <Tooltip
        content="This is a long tooltip message that will wrap at a wider width to demonstrate text wrapping behavior and readability across different maximum widths"
        position="top"
        max-width="400px"
      >
        <Button label="Wide" />
      </Tooltip>
    </div>
  </div>
</template>
```
:::

## More Examples

- [Back to Examples](./index.md)
- [Form Examples](./forms.md)
- [Interactive Examples](./interactive.md)
- [Accessibility Examples](./accessibility.md)
