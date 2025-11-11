<script setup lang="ts">
interface ButtonProps {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  label?: string
}

withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
  type: 'button',
  label: '',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <div
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center px-4 py-2 m-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium leading-relaxed cursor-pointer transition-all duration-200 ease-in-out select-none hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 active:bg-gray-100 dark:active:bg-gray-800 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-500"
    @click="$emit('click', $event)"
  >
    {{ label || '' }}
    <slot v-if="!label" />
  </div>
</template>
