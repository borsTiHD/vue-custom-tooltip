<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="p-8 space-y-8">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
      Tooltip Directive Benchmark
    </h2>

    <!-- Performance test with 100 small buttons with tooltips -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Performance test
      </h3>
      <div class="flex flex-wrap gap-4 items-center">
        <Button
          v-for="(label, idx) in Array.from({ length: 1000 }, (_, i) => `Button ${i + 1}`)" :key="idx"
          v-tooltip="`Tooltip for ${label}`"
          :label="label"
          class="text-xs px-2 py-1"
        />
      </div>
    </div>
  </div>
</template>
