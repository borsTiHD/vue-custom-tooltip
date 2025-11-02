# TODO: WIP - EXAMPLE PAGE

# Examples Gallery

A collection of common use cases and patterns for Vue Custom Tooltip.

## Basic Examples

### Simple Text Tooltips

::: code-group
```vue [Component API]
<template>
  <Tooltip content="Basic tooltip">
    <button>Hover me</button>
  </Tooltip>
</template>
```

```vue [Directive API]
<template>
  <button v-tooltip="'Basic tooltip'">
    Hover me
  </button>
</template>
```
:::

### Rich Content Tooltips

```vue
<template>
  <Tooltip>
    <button>Hover for details</button>

    <template #content>
      <div class="p-4">
        <h3 class="text-lg font-bold">
          Product Details
        </h3>
        <div class="mt-2 space-y-2">
          <p>Premium quality widget</p>
          <p class="text-green-600">
            In stock
          </p>
          <strong>$99.99</strong>
        </div>
      </div>
    </template>
  </Tooltip>
</template>
```

## Form Examples

### Input Helpers

::: code-group
```vue [Component API]
<template>
  <form class="space-y-4">
    <Tooltip content="Must be at least 8 characters">
      <input
        type="password"
        placeholder="Password"
        class="form-input"
      >
    </Tooltip>

    <Tooltip content="We'll never share your email">
      <input
        type="email"
        placeholder="Email"
        class="form-input"
      >
    </Tooltip>
  </form>
</template>
```

```vue [Directive API]
<template>
  <form class="space-y-4">
    <input
      v-tooltip.top.focus="'Must be at least 8 characters'"
      type="password"
      placeholder="Password"
      class="form-input"
    >

    <input
      v-tooltip.top.focus="'We will never share your email'"
      type="email"
      placeholder="Email"
      class="form-input"
    >
  </form>
</template>
```
:::

### Form Validation

```vue
<script setup>
import { ref } from 'vue'

const email = ref('')
const isValid = computed(() => {
  return /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email.value)
})

const getTooltip = computed(() => {
  return isValid.value
    ? 'Email is valid!'
    : 'Please enter a valid email'
})
</script>

<template>
  <Tooltip
    :content="getTooltip"
    :class="{ 'tooltip-error': !isValid }"
  >
    <input
      v-model="email"
      type="email"
      placeholder="Email"
    >
  </Tooltip>
</template>

<style>
.tooltip-error {
  --vct-background: #ef4444;
  --vct-text-color: white;
}
</style>
```

## Navigation Examples

### Icon Navigation

```vue
<template>
  <nav class="flex space-x-4">
    <Tooltip content="Home">
      <a href="/">
        <IconHome class="w-6 h-6" />
      </a>
    </Tooltip>

    <Tooltip content="Settings">
      <a href="/settings">
        <IconSettings class="w-6 h-6" />
      </a>
    </Tooltip>

    <Tooltip content="Profile">
      <a href="/profile">
        <IconUser class="w-6 h-6" />
      </a>
    </Tooltip>
  </nav>
</template>
```

### Breadcrumbs

```vue
<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li>
        <Tooltip content="Go to Home">
          <a href="/">Home</a>
        </Tooltip>
      </li>
      <li>/</li>
      <li>
        <Tooltip content="View all products">
          <a href="/products">Products</a>
        </Tooltip>
      </li>
      <li>/</li>
      <li>
        <Tooltip content="Current page">
          <span class="text-gray-500">Current</span>
        </Tooltip>
      </li>
    </ol>
  </nav>
</template>
```

## Interactive Examples

### Click Tooltips

::: code-group
```vue [Component API]
<template>
  <Tooltip
    content="Click to copy"
    trigger="click"
  >
    <button @click="copyToClipboard">
      Copy text
    </button>
  </Tooltip>
</template>
```

```vue [Directive API]
<template>
  <button
    v-tooltip.click="'Click to copy'"
    @click="copyToClipboard"
  >
    Copy text
  </button>
</template>
```
:::

### Interactive Content

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <Tooltip>
    <button>Interactive tooltip</button>

    <template #content>
      <div class="p-4 text-center">
        <p>Count: {{ count }}</p>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded"
          @click="count++"
        >
          Increment
        </button>
      </div>
    </template>
  </Tooltip>
</template>
```

## Theme Examples

### Theme Switching

```vue
<script setup>
import { setTooltipGlobalTheme } from '@borstihd/vue-custom-tooltip'
import { ref } from 'vue'

const themes = ['default', 'classic', 'primevue', 'vuetify']
const currentTheme = ref('default')

function switchTheme(theme) {
  currentTheme.value = theme
  setTooltipGlobalTheme(theme)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex space-x-2">
      <button
        v-for="theme in themes"
        :key="theme"
        :class="{ active: currentTheme === theme }"
        @click="switchTheme(theme)"
      >
        {{ theme }}
      </button>
    </div>

    <Tooltip content="Theme example">
      <button>Hover to test theme</button>
    </Tooltip>
  </div>
</template>
```

### Custom Themed Tooltips

```vue
<template>
  <!-- Success tooltip -->
  <Tooltip
    content="Operation successful!"
    class="tooltip-success"
  >
    <button>Success</button>
  </Tooltip>

  <!-- Warning tooltip -->
  <Tooltip
    content="Please review changes"
    class="tooltip-warning"
  >
    <button>Warning</button>
  </Tooltip>

  <!-- Error tooltip -->
  <Tooltip
    content="Action failed"
    class="tooltip-error"
  >
    <button>Error</button>
  </Tooltip>
</template>

<style>
.tooltip-success {
  --vct-background: #10b981;
  --vct-text-color: white;
}

.tooltip-warning {
  --vct-background: #f59e0b;
  --vct-text-color: white;
}

.tooltip-error {
  --vct-background: #ef4444;
  --vct-text-color: white;
}
</style>
```

## Advanced Examples

### Delayed Content

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
const data = ref(null)

async function fetchData() {
  loading.value = true
  try {
    const response = await fetch('api/data')
    data.value = await response.json()
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <Tooltip>
    <button @mouseenter="fetchData">
      Hover for data
    </button>

    <template #content>
      <div class="p-4">
        <div v-if="loading">
          Loading...
        </div>
        <div v-else-if="data">
          {{ data }}
        </div>
        <div v-else>
          Hover to load data
        </div>
      </div>
    </template>
  </Tooltip>
</template>
```

### Position Aware

```vue
<script setup>
import { computed, ref } from 'vue'

const position = ref({ x: 0, y: 0 })
const tooltipPosition = computed(() => {
  const { x } = position.value
  return x > window.innerWidth / 2 ? 'left' : 'right'
})

function updatePosition(event) {
  position.value = {
    x: event.clientX,
    y: event.clientY
  }
}
</script>

<template>
  <div
    class="relative h-96"
    @mousemove="updatePosition"
  >
    <Tooltip
      content="Dynamic position"
      :position="tooltipPosition"
    >
      <div
        class="absolute w-4 h-4 bg-blue-500"
        :style="{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }"
      />
    </Tooltip>
  </div>
</template>
```
