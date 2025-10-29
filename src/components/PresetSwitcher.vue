<script setup lang="ts">
import type { TooltipTheme } from '@/types/tooltip'
import { ref } from 'vue'
import { getTooltipGlobalTheme, setTooltipGlobalTheme } from '../index'

// Theme switching logic
const themeOptions = [
  { label: 'Default', value: 'default' },
  { label: 'PrimeVue', value: 'primevue' },
  { label: 'Vuetify', value: 'vuetify' },
]
const currentTheme = ref<TooltipTheme>(getTooltipGlobalTheme() || 'default')
async function handleThemeChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value as TooltipTheme
  setTooltipGlobalTheme(value)
}
</script>

<template>
  <div class="relative inline-block">
    <label for="theme-switcher" class="sr-only">Tooltip Theme</label>
    <select
      id="theme-switcher"
      v-model="currentTheme"
      class="appearance-none flex gap-2 px-2 h-10 items-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
      @change="handleThemeChange"
    >
      <option v-for="opt in themeOptions" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
      <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
        <path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  </div>
</template>
