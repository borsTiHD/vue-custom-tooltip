# Component API

The Vue Custom Tooltip component provides a comprehensive API for creating and customizing tooltips. This page documents all available props, slots, and events.

## Props

| Prop | Type | Default | Description |
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
| `modelValue` | `boolean` | `undefined` | Control visibility with v-model |

## Exposed Methods

The Tooltip component exposes methods for programmatic control via template refs:

| Method | Returns | Description |
|--------|---------|-------------|
| `show()` | `void` | Show the tooltip immediately (bypasses delays) |
| `hide()` | `void` | Hide the tooltip immediately (bypasses delays) |
| `toggle()` | `void` | Toggle the tooltip visibility |
| `isVisible()` | `boolean` | Check if the tooltip is currently visible |

### Using Template Refs

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TooltipExposed } from '@borstihd/vue-custom-tooltip'

const tooltipRef = ref<TooltipExposed | null>(null)

function showTooltip() {
  tooltipRef.value?.show()
}

function hideTooltip() {
  tooltipRef.value?.hide()
}

function toggleTooltip() {
  tooltipRef.value?.toggle()
}
</script>

<template>
  <div>
    <Tooltip ref="tooltipRef" content="Programmatically controlled">
      <button>Target Element</button>
    </Tooltip>
    
    <button @click="showTooltip">Show</button>
    <button @click="hideTooltip">Hide</button>
    <button @click="toggleTooltip">Toggle</button>
  </div>
</template>
```

### Using v-model

The component supports two-way binding for visibility control:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(false)
</script>

<template>
  <div>
    <Tooltip v-model="isVisible" content="Controlled via v-model">
      <button>Target Element</button>
    </Tooltip>
    
    <button @click="isVisible = true">Show</button>
    <button @click="isVisible = false">Hide</button>
    <button @click="isVisible = !isVisible">Toggle</button>
    
    <p>Tooltip is {{ isVisible ? 'visible' : 'hidden' }}</p>
  </div>
</template>
```

## Slots

The component provides two slots for flexible content structuring:

| Slot | Description |
|------|-------------|
| `default` | The trigger element that will show the tooltip |
| `content` | Rich content for the tooltip (alternative to `content` prop) |

### Default Slot

The default slot is where you place the element that triggers the tooltip:

```vue
<template>
  <Tooltip content="Simple tooltip">
    <button>Hover me</button>
  </Tooltip>
</template>
```

### Content Slot

The content slot allows you to use rich HTML content in your tooltips:

```vue
<template>
  <Tooltip>
    <template #default>
      <button>Hover for rich content</button>
    </template>

    <template #content>
      <div class="custom-tooltip">
        <h3>Rich Content</h3>
        <p>This tooltip contains <strong>HTML</strong>!</p>
        <small>And custom styling</small>
        <button class="text-blue-500">
          Action
        </button>
      </div>
    </template>
  </Tooltip>
</template>
```

## TypeScript Support

The component is fully typed. You can import the types for use in your TypeScript code:

```ts
import type {
  TooltipExposed,
  TooltipPosition,
  TooltipProps,
  TooltipTrigger,
} from '@borstihd/vue-custom-tooltip'

// Example usage in component props
const position: TooltipPosition = 'auto'
const trigger: TooltipTrigger = 'both'

// Example usage for template refs
const tooltipRef = ref<TooltipExposed | null>(null)
// or
const tooltipRef = useTemplateRef<TooltipExposed | null>('tooltipRef')
```

## Best Practices

1. **Content Length**: Keep tooltip content concise. For longer content, consider using a popover or modal.
2. **Positioning**: Use `'auto'` position when possible to ensure tooltips remain visible.
3. **Delays**: Add small delays to prevent accidental triggers, especially on hover.
4. **Dark Mode**: Use `dark="auto"` for automatic dark mode detection.
5. **Accessibility**: Ensure trigger elements are focusable and have appropriate ARIA labels.
