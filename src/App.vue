<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import PresetSwitcher from '@/components/PresetSwitcher.vue'
import DirectiveBenchmark from '@/components/showcase/DirectiveBenchmark.vue'
import DirectiveExample from '@/components/showcase/DirectiveExample.vue'
import ProgrammaticControl from '@/components/showcase/ProgrammaticControl.vue'
import TooltipExample from '@/components/showcase/TooltipExample.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import packageJson from '../package.json'

type Tabs = 'component' | 'directive' | 'directive-benchmark' | 'programmatic-control'

const activeTab = ref<Tabs>('component')

function switchTab(tab: Tabs) {
  activeTab.value = tab
}

const githubRepo = packageJson.repository.url.replace('.git', '')
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              Vue Custom Tooltip
            </h1>
            <p class="text-gray-600 dark:text-gray-300 mt-1">
              A flexible and customizable tooltip component and directive for Vue 3
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
              Vue 3
            </span>
            <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
              TypeScript
            </span>

            <PresetSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex space-x-8">
          <button
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            :class="[
              activeTab === 'component'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600',
            ]"
            @click="switchTab('component')"
          >
            Tooltip Component
          </button>
          <button
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            :class="[
              activeTab === 'directive'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600',
            ]"
            @click="switchTab('directive')"
          >
            Tooltip Directive
          </button>
          <button
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            :class="[
              activeTab === 'directive-benchmark'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600',
            ]"
            @click="switchTab('directive-benchmark')"
          >
            Tooltip Directive Benchmark
          </button>
          <button
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            :class="[
              activeTab === 'programmatic-control'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600',
            ]"
            @click="switchTab('programmatic-control')"
          >
            Programmatic Control
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-6 py-8">
      <!-- Tab Description -->
      <div class="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div v-if="activeTab === 'component'" class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Tooltip Component
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            The Tooltip component provides a flexible way to add tooltips to any element using the wrapper approach.
            It supports rich content through slots, custom positioning, and various trigger modes.
          </p>
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
              Slot-based content
            </span>
            <span class="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded">
              Rich HTML support
            </span>
            <span class="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded">
              Custom positioning
            </span>
            <span class="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded">
              Multiple triggers
            </span>
          </div>
        </div>

        <div v-else class="space-y-3">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Tooltip Directive
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            The v-tooltip directive provides a lightweight way to add tooltips directly to elements without wrapping components.
            It supports modifier-based configuration and is perfect for simple text tooltips.
          </p>
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
              Modifier-based config
            </span>
            <span class="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded">
              Lightweight
            </span>
            <span class="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded">
              String or object syntax
            </span>
            <span class="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded">
              Easy integration
            </span>
          </div>
        </div>
      </div>

      <!-- Examples Content -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <TooltipExample v-if="activeTab === 'component'" />
        <DirectiveExample v-else-if="activeTab === 'directive'" />
        <DirectiveBenchmark v-else-if="activeTab === 'directive-benchmark'" />
        <ProgrammaticControl v-else-if="activeTab === 'programmatic-control'" />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div class="max-w-6xl mx-auto px-6 py-8">
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <div class="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <p>Vue Custom Tooltip - A flexible tooltip solution for Vue 3 applications</p>
            <p class="flex items-center gap-2 font-weight-thin">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m14.6 16.6l4.6-4.6l-4.6-4.6L16 6l6 6l-6 6l-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6l6 6l1.4-1.4Z" /></svg>
              with
              <svg xmlns="http://www.w3.org/2000/svg" class="text-rose-500 heartbeat" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z" /></svg>
              in Germany
              <a :href="githubRepo" target="_blank" class="link link-hover hover:text-rose-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 98 96">
                  <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
                </svg>
              </a>
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <Button
              label="Component Docs"
              :disabled="activeTab === 'component'"
              @click="switchTab('component')"
            />
            <Button
              label="Directive Docs"
              :disabled="activeTab === 'directive'"
              @click="switchTab('directive')"
            />
            <Button
              label="Directive Benchmark"
              :disabled="activeTab === 'directive-benchmark'"
              @click="switchTab('directive-benchmark')"
            />
            <Button
              label="Programmatic Control"
              :disabled="activeTab === 'programmatic-control'"
              @click="switchTab('programmatic-control')"
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
