# Programmatic Control

You can control tooltips programmatically using several methods:

## Component Mode

### Using Template Refs

Access the component instance using template refs to call methods directly:

```vue
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import type { TooltipExposed } from 'vue-custom-tooltip'

const tooltipRef = useTemplateRef<TooltipExposed | null>('tooltipRef')

function showTooltip() {
  tooltipRef.value?.show()
}

function hideTooltip() {
  tooltipRef.value?.hide()
}

function toggleTooltip() {
  tooltipRef.value?.toggle()
}

function checkVisibility() {
  const isVisible = tooltipRef.value?.isVisible()
  console.log('Tooltip visible:', isVisible)
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

Control tooltip visibility with two-way binding:

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

## Directive Mode

### Using TooltipControl API

Control directive tooltips by assigning an ID and using the `TooltipControl` API:

```vue
<script setup lang="ts">
import { TooltipControl } from 'vue-custom-tooltip'

function showTooltip() {
  TooltipControl.show('my-tooltip')
}

function hideTooltip() {
  TooltipControl.hide('my-tooltip')
}

function toggleTooltip() {
  TooltipControl.toggle('my-tooltip')
}

function checkVisibility() {
  const isVisible = TooltipControl.isVisible('my-tooltip')
  console.log('Tooltip visible:', isVisible)
}
</script>

<template>
  <div>
    <button 
      v-tooltip="{ 
        content: 'Programmatically controlled', 
        id: 'my-tooltip' 
      }"
    >
      Target Element
    </button>
    
    <button @click="showTooltip">Show</button>
    <button @click="hideTooltip">Hide</button>
    <button @click="toggleTooltip">Toggle</button>
  </div>
</template>
```

## API Reference

### TooltipExposed (Component)

Methods exposed by the Tooltip component via template refs:

| Method | Description |
|--------|-------------|
| `show()` | Show the tooltip immediately (bypasses delays) |
| `hide()` | Hide the tooltip immediately (bypasses delays) |
| `toggle()` | Toggle the tooltip visibility |
| `isVisible()` | Returns `true` if tooltip is currently visible |

### TooltipControl (Directive)

Global API for controlling directive tooltips:

| Method | Parameters | Description |
|--------|------------|-------------|
| `show(id)` | `id: string` | Show tooltip by ID |
| `hide(id)` | `id: string` | Hide tooltip by ID |
| `toggle(id)` | `id: string` | Toggle tooltip by ID |
| `isVisible(id)` | `id: string` | Check if tooltip is visible |

### v-model Support

The Tooltip component supports `v-model` for two-way binding of visibility state:

```vue
<template>
  <Tooltip v-model="isVisible" content="...">
    <button>Target</button>
  </Tooltip>
</template>
```

When the tooltip visibility changes (through user interaction or programmatic control), the bound variable is automatically updated.

## Use Cases

### Show Tooltip on Page Load

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TooltipExposed } from 'vue-custom-tooltip'

const tooltipRef = ref<TooltipExposed | null>(null)

onMounted(() => {
  // Show tooltip after 1 second
  setTimeout(() => {
    tooltipRef.value?.show()
  }, 1000)
})
</script>

<template>
  <Tooltip ref="tooltipRef" content="Welcome!">
    <button>Get Started</button>
  </Tooltip>
</template>
```

### Conditional Tooltip Display

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const hasError = ref(false)
const tooltipVisible = computed({
  get: () => hasError.value,
  set: (value) => {
    if (!value) hasError.value = false
  }
})

function validateForm() {
  hasError.value = true // Shows tooltip automatically
}
</script>

<template>
  <Tooltip v-model="tooltipVisible" content="Please fix the error">
    <input @blur="validateForm" />
  </Tooltip>
</template>
```

### Coordinated Tooltips

```vue
<script setup lang="ts">
import { TooltipControl } from 'vue-custom-tooltip'

function showAllTooltips() {
  TooltipControl.show('tooltip-1')
  TooltipControl.show('tooltip-2')
  TooltipControl.show('tooltip-3')
}

function hideAllTooltips() {
  TooltipControl.hide('tooltip-1')
  TooltipControl.hide('tooltip-2')
  TooltipControl.hide('tooltip-3')
}
</script>

<template>
  <div>
    <button v-tooltip="{ content: 'First', id: 'tooltip-1' }">1</button>
    <button v-tooltip="{ content: 'Second', id: 'tooltip-2' }">2</button>
    <button v-tooltip="{ content: 'Third', id: 'tooltip-3' }">3</button>
    
    <button @click="showAllTooltips">Show All</button>
    <button @click="hideAllTooltips">Hide All</button>
  </div>
</template>
```

## Notes

- Programmatic `show()` and `hide()` methods bypass the configured delays for immediate display/hiding
- When using `v-model`, the tooltip will still respect trigger events (hover, focus, etc.) but the visibility state will be synchronized
- Directive tooltips require an explicit `id` prop for programmatic control
- Component IDs are optional but can be useful for debugging or advanced use cases
