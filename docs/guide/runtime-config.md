# Runtime Configuration

Vue Custom Tooltip provides APIs for managing configuration and themes at runtime. This guide explains how to dynamically update settings and handle configuration changes.

## Configuration Management

### Getting Current Configuration

```ts
import { getTooltipGlobalConfig } from '@borstihd/vue-custom-tooltip'

// Get entire configuration
const config = getTooltipGlobalConfig()
console.log(config.position) // 'auto'
console.log(config.dark) // 'auto'
```

### Updating Configuration

```ts
import { setTooltipGlobalConfig } from '@borstihd/vue-custom-tooltip'

// Update specific options
setTooltipGlobalConfig({
  position: 'top',
  showDelay: 200,
  hideDelay: 150
})

// Update all options
setTooltipGlobalConfig({
  position: 'bottom',
  trigger: 'hover',
  showDelay: 100,
  hideDelay: 100,
  dark: 'auto',
  showArrow: true,
  offset: 8,
  maxWidth: '250px'
})
```

### Resetting Configuration

```ts
import { resetTooltipGlobalConfig } from '@borstihd/vue-custom-tooltip'

// Reset to default values
resetTooltipGlobalConfig()
```

## Theme Management

### Getting Current Theme

```ts
import { getTooltipGlobalTheme } from '@borstihd/vue-custom-tooltip'

// Get active theme
const theme = getTooltipGlobalTheme()
console.log(theme) // 'default', 'classic', 'vuetify', etc.
```

### Changing Themes

```ts
import { setTooltipGlobalTheme } from '@borstihd/vue-custom-tooltip'

// Switch to a different theme
setTooltipGlobalTheme('primevue')

// Revert to default theme
setTooltipGlobalTheme('default')
```

## Real-world Examples

### Theme Switcher Component

```vue
<script setup lang="ts">
import type { TooltipTheme } from '@borstihd/vue-custom-tooltip'
import {
  getTooltipGlobalTheme,
  setTooltipGlobalTheme
} from '@borstihd/vue-custom-tooltip'
import { ref } from 'vue'

const currentTheme = ref<TooltipTheme>(getTooltipGlobalTheme())

function switchTheme(theme: TooltipTheme) {
  setTooltipGlobalTheme(theme)
  currentTheme.value = theme
}
</script>

<template>
  <div class="theme-switcher">
    <button
      v-for="theme in ['default', 'classic', 'primevue', 'vuetify']"
      :key="theme"
      :class="{ active: currentTheme === theme }"
      @click="switchTheme(theme)"
    >
      {{ theme }}
    </button>
  </div>
</template>
```

### Dark Mode Toggle

```vue
<script setup lang="ts">
import { setTooltipGlobalConfig } from '@borstihd/vue-custom-tooltip'
import { ref, watch } from 'vue'

const isDark = ref(false)

watch(isDark, (dark) => {
  setTooltipGlobalConfig({
    dark
  })
})
</script>

<template>
  <button @click="isDark = !isDark">
    {{ isDark ? 'Light Mode' : 'Dark Mode' }}
  </button>
</template>
```

### Responsive Configuration

```vue
<script setup lang="ts">
import { setTooltipGlobalConfig } from '@borstihd/vue-custom-tooltip'
import { onMounted, onUnmounted } from 'vue'

function updateConfig() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches

  setTooltipGlobalConfig({
    position: isMobile ? 'bottom' : 'auto',
    maxWidth: isMobile ? '200px' : '250px',
    showDelay: isMobile ? 0 : 100
  })
}

// Listen for viewport changes
onMounted(() => {
  window.addEventListener('resize', updateConfig)
  updateConfig()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateConfig)
})
</script>
```

### Settings Panel

```vue
<script setup lang="ts">
import {
  getTooltipGlobalConfig,
  setTooltipGlobalConfig
} from '@borstihd/vue-custom-tooltip'
import { ref } from 'vue'

const config = ref(getTooltipGlobalConfig())

function updateConfig(key: string, value: any) {
  config.value[key] = value
  setTooltipGlobalConfig(config.value)
}
</script>

<template>
  <div class="settings-panel">
    <!-- Position -->
    <select
      v-model="config.position"
      @change="updateConfig('position', $event.target.value)"
    >
      <option value="auto">
        Auto
      </option>
      <option value="top">
        Top
      </option>
      <option value="bottom">
        Bottom
      </option>
      <option value="left">
        Left
      </option>
      <option value="right">
        Right
      </option>
    </select>

    <!-- Show Delay -->
    <input
      v-model="config.showDelay"
      type="range"
      min="0"
      max="1000"
      step="50"
      @input="updateConfig('showDelay', parseInt($event.target.value))"
    >

    <!-- Show Arrow -->
    <input
      v-model="config.showArrow"
      type="checkbox"
      @change="updateConfig('showArrow', $event.target.checked)"
    >
  </div>
</template>
```

## TypeScript Support

```ts
import type {
  TooltipConfig,
  TooltipPosition,
  TooltipTheme,
  TooltipTrigger
} from '@borstihd/vue-custom-tooltip'

// Type-safe configuration
const config: TooltipConfig = {
  position: 'auto' as TooltipPosition,
  trigger: 'both' as TooltipTrigger,
  showDelay: 100,
  hideDelay: 100,
  dark: 'auto'
}

setTooltipGlobalConfig(config)
```

## Next Steps

- [Theme Guide](../themes/overview.md) - Theme configuration
