<script setup lang="ts">
interface CardProps {
  title?: string
  subtitle?: string
}

withDefaults(defineProps<CardProps>(), {
  title: undefined,
  subtitle: undefined,
})
</script>

<template>
  <div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div v-if="title" class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <p v-if="subtitle" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {{ subtitle }}
      </p>
    </div>

    <div class="px-6 py-4">
      <slot />
    </div>
  </div>
</template>
