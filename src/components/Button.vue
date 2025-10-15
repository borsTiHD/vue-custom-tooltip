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
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center px-4 py-2 m-1 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium leading-relaxed cursor-pointer transition-all duration-200 ease-in-out select-none hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
    @click="$emit('click', $event)"
  >
    {{ label || '' }}
    <slot v-if="!label" />
  </button>
</template>
