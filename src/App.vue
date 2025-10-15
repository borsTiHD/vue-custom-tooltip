<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import TooltipDirectiveExample from '@/components/tooltip/TooltipDirectiveExample.vue'
import TooltipExample from '@/components/tooltip/TooltipExample.vue'

const activeTab = ref<'component' | 'directive'>('component')

function switchTab(tab: 'component' | 'directive') {
  activeTab.value = tab
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              Vue Custom Tooltip
            </h1>
            <p class="text-gray-600 mt-1">
              A flexible and customizable tooltip component and directive for Vue 3
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Vue 3
            </span>
            <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              TypeScript
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="bg-white border-b">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex space-x-8">
          <button
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            :class="[
              activeTab === 'component'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            ]"
            @click="switchTab('component')"
          >
            Tooltip Component
          </button>
          <button
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            :class="[
              activeTab === 'directive'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            ]"
            @click="switchTab('directive')"
          >
            Tooltip Directive
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-6 py-8">
      <!-- Tab Description -->
      <div class="mb-8 p-6 bg-white rounded-lg shadow-sm border">
        <div v-if="activeTab === 'component'" class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900">
            Tooltip Component
          </h2>
          <p class="text-gray-600">
            The Tooltip component provides a flexible way to add tooltips to any element using the wrapper approach.
            It supports rich content through slots, custom positioning, and various trigger modes.
          </p>
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
              Slot-based content
            </span>
            <span class="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
              Rich HTML support
            </span>
            <span class="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded">
              Custom positioning
            </span>
            <span class="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded">
              Multiple triggers
            </span>
          </div>
        </div>

        <div v-else class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900">
            Tooltip Directive
          </h2>
          <p class="text-gray-600">
            The v-tooltip directive provides a lightweight way to add tooltips directly to elements without wrapping components.
            It supports modifier-based configuration and is perfect for simple text tooltips.
          </p>
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
              Modifier-based config
            </span>
            <span class="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
              Lightweight
            </span>
            <span class="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded">
              String or object syntax
            </span>
            <span class="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded">
              Easy integration
            </span>
          </div>
        </div>
      </div>

      <!-- Examples Content -->
      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <TooltipExample v-if="activeTab === 'component'" />
        <TooltipDirectiveExample v-else />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-16">
      <div class="max-w-6xl mx-auto px-6 py-8">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            <p>Vue Custom Tooltip - A flexible tooltip solution for Vue 3 applications</p>
          </div>
          <div class="flex items-center space-x-4">
            <Button
              label="Component Docs"
              :disabled="activeTab !== 'component'"
              @click="switchTab('component')"
            />
            <Button
              label="Directive Docs"
              :disabled="activeTab !== 'directive'"
              @click="switchTab('directive')"
            />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Custom styles for the showcase */
.transition-colors {
  transition-property: color, background-color, border-color;
}
</style>
