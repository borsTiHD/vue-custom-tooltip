<script setup lang="ts">
import type { TooltipPositioningStrategy } from '@/types/tooltip'
import { ref } from 'vue'
import { getTooltipGlobalConfig, setTooltipGlobalPositioningStrategy } from '../index'
import { supportsAnchorPositioning } from '../utils/anchorSupport'

const strategyOptions = [
  { label: 'CSS Anchors', value: 'css' },
  { label: 'JavaScript', value: 'js' },
]

const currentStrategy = ref<TooltipPositioningStrategy>(
  getTooltipGlobalConfig().positioningStrategy || 'css',
)

const hasAnchorSupport = supportsAnchorPositioning()

function handleStrategyChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value as TooltipPositioningStrategy
  setTooltipGlobalPositioningStrategy(value)
}
</script>

<template>
  <div class="relative inline-block">
    <label for="strategy-switcher" class="sr-only">Positioning Strategy</label>
    <select
      id="strategy-switcher"
      v-model="currentStrategy"
      v-tooltip.top="hasAnchorSupport
        ? 'Switch the positioning strategy'
        : 'This browser has no CSS anchor support — both options behave the same'"
      class="appearance-none! flex! gap-2! px-2! h-10! items-center! rounded-md! border! border-gray-300! dark:border-gray-700! bg-white! dark:bg-gray-800! text-gray-700! dark:text-gray-200! text-sm! focus:outline-none! focus:ring-2! focus:ring-blue-500! pr-8!"
      aria-label="Switch the positioning strategy"
      :title="`Current: ${currentStrategy} positioning`"
      @change="handleStrategyChange"
    >
      <option v-for="opt in strategyOptions" :key="opt.value" :value="opt.value">
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
