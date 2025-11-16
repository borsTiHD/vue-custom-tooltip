<script setup lang="ts">
import type { TooltipExposed } from '@/types/tooltip'
import { ref, useTemplateRef } from 'vue'
import Tooltip from '@/components/tooltip/Tooltip.vue'
import { TooltipControl } from '@/directives/tooltip'

// Method 1: Using template ref
const tooltipRef = useTemplateRef<TooltipExposed | null>('tooltipRef')

// Method 2: Using v-model
const isVisible = ref(false)

// Methods for ref control
function showRefTooltip() {
  tooltipRef.value?.show()
}

function hideRefTooltip() {
  tooltipRef.value?.hide()
}

// Methods for directive control
function showDirectiveTooltip() {
  TooltipControl.show('controlled-tooltip')
}

function hideDirectiveTooltip() {
  TooltipControl.hide('controlled-tooltip')
}
</script>

<template>
  <div class="p-8 space-y-8">
    <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
      Programmatic Tooltip Control Demo
    </h2>

    <!-- Method 1: Template Ref -->
    <section class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Method 1: Template Ref
      </h3>
      <div class="flex gap-2 items-center">
        <Tooltip ref="tooltipRef" content="Controlled via ref">
          <button class="px-4 py-2 bg-blue-500 text-white rounded">
            Target Element
          </button>
        </Tooltip>
        <button class="px-3 py-1 bg-green-600 text-white rounded text-sm" @click="showRefTooltip">
          Show
        </button>
        <button class="px-3 py-1 bg-red-600 text-white rounded text-sm" @click="hideRefTooltip">
          Hide
        </button>
      </div>
      <pre class="bg-gray-100 dark:bg-gray-700 dark:text-white p-4 rounded text-sm"><code>const tooltipRef = ref&lt;TooltipExposed | null&gt;(null)
tooltipRef.value?.show()
tooltipRef.value?.hide()</code></pre>
    </section>

    <!-- Method 2: v-model -->
    <section class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Method 2: v-model
      </h3>
      <div class="flex gap-2 items-center">
        <Tooltip v-model="isVisible" content="Controlled via v-model">
          <button class="px-4 py-2 bg-blue-500 text-white rounded">
            Target Element
          </button>
        </Tooltip>
        <button class="px-3 py-1 bg-green-600 text-white rounded text-sm" @click="isVisible = true">
          Show
        </button>
        <button class="px-3 py-1 bg-red-600 text-white rounded text-sm" @click="isVisible = false">
          Hide
        </button>
        <span class="text-sm text-gray-600">
          State: {{ isVisible ? 'Visible' : 'Hidden' }}
        </span>
      </div>
      <pre class="bg-gray-100 dark:bg-gray-700 dark:text-white p-4 rounded text-sm"><code>const isVisible = ref(false)
// Changes automatically sync
&lt;Tooltip v-model="isVisible" ...&gt;</code></pre>
    </section>

    <!-- Method 3: Directive + TooltipControl -->
    <section class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Method 3: Directive + TooltipControl API
      </h3>
      <div class="flex gap-2 items-center">
        <button
          v-tooltip="{ content: 'Controlled via TooltipControl API', id: 'controlled-tooltip' }"
          class="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Target Element
        </button>
        <button class="px-3 py-1 bg-green-600 text-white rounded text-sm" @click="showDirectiveTooltip">
          Show
        </button>
        <button class="px-3 py-1 bg-red-600 text-white rounded text-sm" @click="hideDirectiveTooltip">
          Hide
        </button>
      </div>
      <pre class="bg-gray-100 dark:bg-gray-700 dark:text-white p-4 rounded text-sm"><code>import { TooltipControl } from '@borstihd/vue-custom-tooltip'
TooltipControl.show('controlled-tooltip')
TooltipControl.hide('controlled-tooltip')</code></pre>
    </section>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: translateY(0);
}
</style>
