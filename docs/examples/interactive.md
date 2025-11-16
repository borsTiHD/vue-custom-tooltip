<script setup>
import { ref, useTemplateRef } from 'vue'
import { TooltipControl } from '@/index'

// Reactive Tooltip Content
const count = ref(0)

const getMessage = () => `You've clicked ${count.value} times`

// Rich Content with Actions
const copied = ref(false)
const code = 'npm install @borstihd/vue-custom-tooltip'

function copyToClipboard() {
  navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

// Interactive Counter
const count2 = ref(0)

function increment() {
  count2.value++
}

function decrement() {
  count2.value = Math.max(0, count2.value - 1)
}

function reset() {
  count2.value = 0
}

// Show/Hide Tooltips with Buttons
const tooltipRef = useTemplateRef('tooltipRef')

function showTooltip() {
  tooltipRef.value?.show()
}

function hideTooltip() {
  tooltipRef.value?.hide()
}

function toggleTooltip() {
  tooltipRef.value?.toggle()
}

// v-model Control
const isVisible = ref(false)

// Show Multiple Tooltips at Once
function showAll() {
  TooltipControl.show('first-tooltip')
  TooltipControl.show('second-tooltip')
  TooltipControl.show('third-tooltip')
}

function hideAll() {
  TooltipControl.hide('first-tooltip')
  TooltipControl.hide('second-tooltip')
  TooltipControl.hide('third-tooltip')
}
</script>

# Interactive Examples

Examples showcasing interactive tooltip patterns including click-triggered tooltips, dynamic content, coordinated tooltips, and programmatic control.

## Click-Triggered Tooltips

### Toggle on Click

<Card>
  <div class="space-y-4">
    <Button v-tooltip.click="'Click to dismiss'" label="Click me!" />
    <p class="text-sm text-gray-600 dark:text-gray-400">
      The tooltip above uses click-triggered mode. Click anywhere else to dismiss it.
    </p>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<script setup>
import { ref } from 'vue'

const message = ref('Click to dismiss')
</script>

<template>
  <div class="space-y-4">
    <Tooltip :content="message" trigger="click">
      <Button label="Click me!" />
    </Tooltip>

    <p class="text-sm text-gray-600 dark:text-gray-400">
      The tooltip above uses click-triggered mode. Click anywhere else to dismiss it.
    </p>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="space-y-4">
    <Button v-tooltip.click="'Click to dismiss'" label="Click me!" />

    <p class="text-sm text-gray-600 dark:text-gray-400">
      The tooltip above uses click-triggered mode. Click anywhere else to dismiss it.
    </p>
  </div>
</template>
```
:::

## Dynamic Content

### Reactive Tooltip Content

<Card>
  <div class="flex flex-col gap-4 items-start">
    <Tooltip :content="getMessage()">
      <Button @click="count++" label="Click to increment" />
    </Tooltip>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Tooltip content updates every time you click the button.
    </p>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<script setup>
import { ref } from 'vue'

const count = ref(0)

const getMessage = () => `You've clicked ${count.value} times`
</script>

<template>
  <div class="flex flex-col gap-4 items-start">
    <Tooltip :content="getMessage()">
      <Button @click="count++" label="Click to increment" />
    </Tooltip>

    <p class="text-sm text-gray-600 dark:text-gray-400">
      Tooltip content updates every time you click the button.
    </p>
  </div>
</template>
```
:::

## Interactive Tooltip Content

### Rich Content with Actions

<Card>
  <Tooltip trigger="click">
    <Button label="Show install command" />
    <template #content>
      <div class="p-4 max-w-xs">
        <p class="text-sm mb-3">Install with npm:</p>
        <div class="bg-gray-800 text-gray-200 rounded p-2 mb-3 text-xs font-mono break-words">
          {{ code }}
        </div>
        <Button
          :label="copied ? 'Copied!' : 'Copy command'"
          @click="copyToClipboard"
          class="w-full text-sm"
        />
      </div>
    </template>
  </Tooltip>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<script setup>
import { ref } from 'vue'

const copied = ref(false)
const code = 'npm install @borstihd/vue-custom-tooltip'

function copyToClipboard() {
  navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <Tooltip trigger="click">
    <Button label="Show install command" />

    <template #content>
      <div class="p-4 max-w-xs">
        <p class="text-sm mb-3">Install with npm:</p>
        <div class="bg-gray-800 text-gray-200 rounded p-2 mb-3 text-xs font-mono break-words">
          {{ code }}
        </div>
        <Button
          :label="copied ? 'Copied!' : 'Copy command'"
          @click="copyToClipboard"
          class="w-full text-sm"
        />
      </div>
    </template>
  </Tooltip>
</template>
```
:::

### Interactive Counter

<Card>
  <Tooltip trigger="click">
    <Button label="Open counter" />
    <template #content>
      <div class="p-4 text-center">
        <p class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {{ count2 }}
        </p>
        <div class="flex gap-2">
          <Button label="−" @click="decrement" />
          <Button label="Reset" @click="reset" />
          <Button label="+" @click="increment" />
        </div>
      </div>
    </template>
  </Tooltip>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  count.value = Math.max(0, count.value - 1)
}

function reset() {
  count.value = 0
}
</script>

<template>
  <Tooltip trigger="click">
    <Button label="Open counter" />

    <template #content>
      <div class="p-4 text-center">
        <p class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {{ count }}
        </p>
        <div class="flex gap-2">
          <Button label="−" @click="decrement" />
          <Button label="Reset" @click="reset" />
          <Button label="+" @click="increment" />
        </div>
      </div>
    </template>
  </Tooltip>
</template>
```
:::

## Programmatic Control

### Show/Hide Tooltips with Buttons

<Card>
  <div class="space-y-4">
    <div class="flex gap-2">
      <Tooltip ref="tooltipRef" content="I'm controlled programmatically!">
        <Button label="Target" />
      </Tooltip>
      <Button label="Show" @click="showTooltip" />
      <Button label="Hide" @click="hideTooltip" />
      <Button label="Toggle" @click="toggleTooltip" />
    </div>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<script setup>
import { ref, useTemplateRef } from 'vue'

const tooltipRef = useTemplateRef('tooltipRef')

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
  <div class="space-y-4">
    <div class="flex gap-2">
      <Tooltip ref="tooltipRef" content="I'm controlled programmatically!">
        <Button label="Target" />
      </Tooltip>

      <Button label="Show" @click="showTooltip" />
      <Button label="Hide" @click="hideTooltip" />
      <Button label="Toggle" @click="toggleTooltip" />
    </div>
  </div>
</template>
```

```vue [Directive API]
<script setup>
import { TooltipControl } from 'vue-custom-tooltip'

function showTooltip() {
  TooltipControl.show('demo-tooltip')
}

function hideTooltip() {
  TooltipControl.hide('demo-tooltip')
}

function toggleTooltip() {
  TooltipControl.toggle('demo-tooltip')
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2 flex-wrap">
      <Button v-tooltip="{ content: 'Controlled!', id: 'demo-tooltip' }" label="Target" />

      <Button label="Show" @click="showTooltip" />
      <Button label="Hide" @click="hideTooltip" />
      <Button label="Toggle" @click="toggleTooltip" />
    </div>
  </div>
</template>
```

:::

### v-model Control

<Card>
  <div class="space-y-4">
    <div class="flex gap-2 items-center">
      <Tooltip v-model="isVisible" content="Controlled via v-model" position="top">
        <Button label="Target" />
      </Tooltip>
      <Button label="Show" @click="isVisible = true" />
      <Button label="Hide" @click="isVisible = false" />
      <Button label="Toggle" @click="isVisible = !isVisible" />
    </div>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Current state: <strong>{{ isVisible ? 'Visible' : 'Hidden' }}</strong>
    </p>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<script setup>
import { ref } from 'vue'

const isVisible = ref(false)
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2 items-center">
      <Tooltip v-model="isVisible" content="Controlled via v-model" position="top">
        <Button label="Target" />
      </Tooltip>

      <Button label="Show" @click="isVisible = true" />
      <Button label="Hide" @click="isVisible = false" />
      <Button label="Toggle" @click="isVisible = !isVisible" />
    </div>

    <p class="text-sm text-gray-600 dark:text-gray-400">
      Current state: <strong>{{ isVisible ? 'Visible' : 'Hidden' }}</strong>
    </p>
  </div>
</template>
```
:::

## Coordinated Tooltips

### Show Multiple Tooltips at Once

<Card>
  <div class="space-y-4">
    <div class="flex gap-2 flex-wrap mb-4">
      <Button
        v-tooltip="{ content: 'First step', id: 'first-tooltip', position: 'top' }"
        label="Step 1"
      />
      <Button
        v-tooltip="{ content: 'Second step', id: 'second-tooltip', position: 'top' }"
        label="Step 2"
      />
      <Button
        v-tooltip="{ content: 'Third step', id: 'third-tooltip', position: 'top' }"
        label="Step 3"
      />
    </div>
    <div class="flex gap-2">
      <Button label="Show All" @click="showAll" />
      <Button label="Hide All" @click="hideAll" />
    </div>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Directive API]
<script setup>
import { TooltipControl } from '@borstihd/vue-custom-tooltip'

function showAll() {
  TooltipControl.show('first-tooltip')
  TooltipControl.show('second-tooltip')
  TooltipControl.show('third-tooltip')
}

function hideAll() {
  TooltipControl.hide('first-tooltip')
  TooltipControl.hide('second-tooltip')
  TooltipControl.hide('third-tooltip')
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2 flex-wrap mb-4">
      <Button
        v-tooltip="{ content: 'First step', id: 'first-tooltip', position: 'top' }"
        label="Step 1"
      />
      <Button
        v-tooltip="{ content: 'Second step', id: 'second-tooltip', position: 'top' }"
        label="Step 2"
      />
      <Button
        v-tooltip="{ content: 'Third step', id: 'third-tooltip', position: 'top' }"
        label="Step 3"
      />
    </div>

    <div class="flex gap-2">
      <Button label="Show All" @click="showAll" />
      <Button label="Hide All" @click="hideAll" />
    </div>
  </div>
</template>
```
:::

## More Examples

- [Back to Examples](./index.md)
- [Form Examples](./forms.md)
- [Positioning Examples](./positioning.md)
- [Accessibility Examples](./accessibility.md)
