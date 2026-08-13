<script setup lang="ts">
import type { TooltipPositioningStrategy } from '@/types/tooltip'
import { ref } from 'vue'
import Tooltip from '@/components/tooltip/Tooltip.vue'
import { supportsAnchorPositioning } from '@/utils/anchorSupport'

const strategy = ref<TooltipPositioningStrategy>('css')
const hasAnchorSupport = supportsAnchorPositioning()

const edgeTargets = [
  { label: 'Left edge', text: 'Anchored to the left button' },
  { label: 'Centre', text: 'Anchored to the centre button' },
  { label: 'Right edge', text: 'Anchored to the right button' },
]

const buttonClass = 'px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors'
const cardClass = 'p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0'
</script>

<template>
  <div>
    <div :class="cardClass">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Positioning Strategy
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Compare native CSS anchor positioning against the JavaScript fallback.
            The switch below only affects the examples on this page.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <span
            class="px-3 py-1 text-xs font-medium rounded-full"
            :class="hasAnchorSupport
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'"
          >
            {{ hasAnchorSupport ? 'CSS anchors supported' : 'No CSS anchor support — falls back to JS' }}
          </span>

          <div class="inline-flex rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
            <button
              v-for="option in (['css', 'js'] as const)"
              :key="option"
              class="px-3 py-2 text-sm font-medium transition-colors"
              :class="strategy === option
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'"
              @click="strategy = option"
            >
              {{ option === 'css' ? 'CSS Anchors' : 'JavaScript' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div :class="cardClass">
      <h4 class="font-semibold text-gray-900 dark:text-white">
        1. Viewport edges &amp; flipping
      </h4>
      <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-6">
        All tooltips render into <code>&lt;body&gt;</code> via Teleport, yet stay tethered to their trigger.
        Narrow the window: the flip order is bottom &rarr; top &rarr; right &rarr; left.
      </p>

      <div class="flex justify-between">
        <Tooltip
          v-for="target in edgeTargets"
          :key="target.label"
          :content="target.text"
          :positioning-strategy="strategy"
        >
          <button :class="buttonClass">
            {{ target.label }}
          </button>
        </Tooltip>
      </div>
    </div>

    <div :class="cardClass">
      <h4 class="font-semibold text-gray-900 dark:text-white">
        2. Scrolling behaviour
      </h4>
      <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-6">
        Open a tooltip and scroll the box. With <strong>CSS Anchors</strong> the tooltip follows its
        trigger and disappears once the trigger leaves the viewport. With <strong>JavaScript</strong>
        it hides as soon as scrolling starts.
      </p>

      <div class="h-64 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700 p-4 space-y-4">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Scroll down to reach the trigger.
        </p>
        <div class="h-40" />
        <Tooltip content="I stay attached while you scroll" :positioning-strategy="strategy">
          <button :class="buttonClass">
            Trigger inside a scroll container
          </button>
        </Tooltip>
        <div class="h-96" />
        <p class="text-sm text-gray-500 dark:text-gray-400">
          End of the scroll container.
        </p>
      </div>
    </div>

    <div :class="cardClass">
      <h4 class="font-semibold text-gray-900 dark:text-white">
        3. Directive with strategy modifiers
      </h4>
      <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-6">
        The directive accepts <code>.css</code> and <code>.js</code> modifiers, so a single tooltip can opt out
        without touching the global configuration.
      </p>

      <div class="flex flex-wrap gap-4">
        <button v-tooltip.css="'Positioned with CSS anchors'" :class="buttonClass">
          v-tooltip.css
        </button>
        <button v-tooltip.js="'Positioned with JavaScript'" :class="buttonClass">
          v-tooltip.js
        </button>
        <button v-tooltip="'Uses the global default'" :class="buttonClass">
          v-tooltip (global default)
        </button>
      </div>
    </div>

    <div :class="cardClass">
      <h4 class="font-semibold text-gray-900 dark:text-white">
        4. Page scroll
      </h4>
      <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-6">
        Open the tooltip, then scroll the page itself to compare both strategies.
      </p>

      <Tooltip content="Following the page scroll" :positioning-strategy="strategy">
        <button :class="buttonClass">
          Trigger near the page bottom
        </button>
      </Tooltip>

      <div class="h-[80vh]" />
    </div>
  </div>
</template>
