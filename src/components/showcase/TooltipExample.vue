<script setup lang="ts">
import type { TooltipExposed } from '@/types/tooltip'
import { ref, useTemplateRef } from 'vue'
import Button from '@/components/Button.vue'

const btnLabel = ref('Click me to change!')
const tooltipMsg = ref('Click this Button, it will change the button text and tooltip text')

// Programmatic control refs
const tooltipRef = useTemplateRef<TooltipExposed | null>('tooltipRef')
const vModelVisible = ref(false)

function onClick(message: string) {
  btnLabel.value = message
  tooltipMsg.value = message
}

// Programmatic control functions
function showTooltip() {
  tooltipRef.value?.show()
}

function hideTooltip() {
  tooltipRef.value?.hide()
}

function toggleTooltip() {
  tooltipRef.value?.toggle()
}
</script>

<template>
  <div class="p-8 space-y-8">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
      Tooltip Component Examples
    </h2>

    <!-- Basic usage with content prop -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Basic Usage
      </h3>
      <div class="flex gap-4 items-center">
        <Tooltip content="This is a simple tooltip">
          <Button label="Hover me" />
        </Tooltip>

        <Tooltip content="This tooltip has a longer message to demonstrate text wrapping in tooltips">
          <Button label="Long tooltip" />
        </Tooltip>

        <Tooltip content="Disabled tooltip" disabled>
          <Button label="Disabled tooltip" />
        </Tooltip>

        <Tooltip :content="tooltipMsg">
          <Button :label="btnLabel" @click="onClick('This Button/Tooltip got Changed')" />
        </Tooltip>
      </div>
    </div>

    <!-- Programmatic Control -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Programmatic Control
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Control tooltips programmatically using refs, v-model, or the TooltipControl API for directives.
      </p>

      <!-- Component with ref -->
      <div class="space-y-2">
        <h4 class="text-md font-medium text-gray-700 dark:text-gray-300">
          Using Component Ref
        </h4>
        <div class="flex gap-2 items-center">
          <Tooltip ref="tooltipRef" content="Controlled programmatically via ref">
            <Button label="Target element" />
          </Tooltip>
          <Button label="Show" size="small" @click="showTooltip" />
          <Button label="Hide" size="small" @click="hideTooltip" />
          <Button label="Toggle" size="small" @click="toggleTooltip" />
        </div>
      </div>

      <!-- Component with v-model -->
      <div class="space-y-2">
        <h4 class="text-md font-medium text-gray-700 dark:text-gray-300">
          Using v-model
        </h4>
        <div class="flex gap-2 items-center">
          <Tooltip v-model="vModelVisible" content="Controlled via v-model">
            <Button label="Target element" />
          </Tooltip>
          <Button label="Show" size="small" @click="vModelVisible = true" />
          <Button label="Hide" size="small" @click="vModelVisible = false" />
          <Button label="Toggle" size="small" @click="vModelVisible = !vModelVisible" />
          <span class="text-sm text-gray-600 dark:text-gray-400">
            State: {{ vModelVisible ? 'Visible' : 'Hidden' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Auto mode (default) -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Auto Mode (Default)
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Automatically detects both OS dark mode and Tailwind's .dark class
      </p>

      <div class="flex gap-4 items-center">
        <Tooltip content="I automatically adapt to dark mode!">
          <Button label="Auto Mode (default)" />
        </Tooltip>

        <Tooltip content="Same behavior with explicit prop" dark="auto">
          <Button label="Auto Mode (explicit)" />
        </Tooltip>
      </div>
    </div>

    <!-- Force dark/light mode -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Force Dark/Light Mode
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Always uses dark/light theme, regardless of system or class settings
      </p>

      <div class="flex gap-4 items-center">
        <Tooltip content="I'm always dark!" :dark="true">
          <Button label="Always Dark" />
        </Tooltip>

        <Tooltip content="I'm always light!" :dark="false">
          <Button label="Always Light" />
        </Tooltip>
      </div>
    </div>

    <!-- Different trigger modes -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Different Trigger Modes
      </h3>
      <div class="flex gap-4 items-center">
        <Tooltip content="Hover only" trigger="hover">
          <Button label="Hover only" />
        </Tooltip>

        <Tooltip content="Focus only (tab to me)" trigger="focus">
          <Button label="Focus only" />
        </Tooltip>

        <Tooltip content="Both hover and focus" trigger="both">
          <Button label="Hover & Focus" />
        </Tooltip>

        <Tooltip content="Click to toggle" trigger="click">
          <Button label="Click to toggle" />
        </Tooltip>
      </div>
    </div>

    <!-- Custom delays -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Custom Delays
      </h3>
      <div class="flex gap-4 items-center">
        <Tooltip content="Fast tooltip (10ms)" :show-delay="10" :hide-delay="50">
          <Button label="Fast tooltip" />
        </Tooltip>

        <Tooltip content="Slow tooltip (1000ms)" :show-delay="1000" :hide-delay="500">
          <Button label="Slow tooltip" />
        </Tooltip>
      </div>
    </div>

    <!-- Custom styling -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Custom Styling
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Customize the tooltip's appearance using CSS variables or utility classes.
      </p>
      <div class="flex gap-4 items-center flex-wrap">
        <Tooltip
          content="Custom width with long text to show wrapping. This tooltip has a max-width of 400px."
          max-width="400px"
          tooltip-class="my-wide-tooltip"
        >
          <Button label="Wide tooltip (400px)" />
        </Tooltip>

        <Tooltip
          content="Uses CSS variables - clean and simple!"
          tooltip-class="my-tooltip"
        >
          <Button label="CSS Variables" />
        </Tooltip>

        <Tooltip
          content="Gradient tooltip"
          tooltip-class="my-gradient-tooltip"
        >
          <Button label="Gradient" />
        </Tooltip>
      </div>
    </div>

    <!-- Positioning -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Positioning
      </h3>
      <div class="flex gap-4 items-center">
        <!-- Tooltip top -->
        <Tooltip content="Appears at the top" position="top">
          <Button label="Tooltip top" />
        </Tooltip>

        <!-- Tooltip left -->
        <Tooltip content="Appears at the left" position="left">
          <Button label="Tooltip left" />
        </Tooltip>

        <!-- Tooltip right -->
        <Tooltip content="Appears at the right" position="right">
          <Button label="Tooltip right" />
        </Tooltip>

        <!-- Tooltip bottom -->
        <Tooltip content="Appears at the bottom" position="bottom">
          <Button label="Tooltip bottom" />
        </Tooltip>

        <!-- Automatic positioning -->
        <Tooltip content="Automatically positioned" position="auto">
          <Button label="Auto Position" />
        </Tooltip>
      </div>
    </div>

    <!-- Using slot content -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Rich Content with Slots
      </h3>
      <div class="flex gap-4 items-center">
        <Tooltip>
          <Button label="Rich content" />
          <template #content>
            <div class="space-y-2">
              <div class="font-semibold text-blue-600 dark:text-blue-400">
                Rich Tooltip
              </div>
              <div class="text-sm">
                This tooltip contains <strong>rich content</strong> with:
              </div>
              <ul class="text-xs list-disc list-inside">
                <li>Multiple paragraphs</li>
                <li>Formatted text</li>
                <li>Different colors</li>
              </ul>
            </div>
          </template>
        </Tooltip>

        <Tooltip trigger="click">
          <Button label="Interactive content" />
          <template #content>
            <div class="space-y-3">
              <div class="font-semibold">
                Interactive Tooltip
              </div>
              <Button label="Click me!" size="small" />
              <div class="text-xs text-gray-600 dark:text-gray-400">
                This tooltip stays open until you click outside
              </div>
            </div>
          </template>
        </Tooltip>
      </div>
    </div>

    <!-- Icons and small elements -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Icons and Small Elements
      </h3>
      <div class="flex gap-4 items-center">
        <Tooltip content="Information icon">
          <span class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
            ℹ
          </span>
        </Tooltip>

        <Tooltip content="!" position="top">
          <span class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
            🚨
          </span>
        </Tooltip>

        <Tooltip content="Help icon" position="left">
          <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
            ?
          </span>
        </Tooltip>

        <Tooltip content="Warning" position="right">
          <span class="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm cursor-help">
            ⚠
          </span>
        </Tooltip>
      </div>
    </div>

    <!-- Text elements -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Text Elements
      </h3>
      <div class="flex gap-4 items-center">
        <p class="text-gray-700 dark:text-gray-300">
          This is a paragraph with a
          <Tooltip content="Helpful explanation">
            <span class="underline decoration-dotted text-blue-600 dark:text-blue-400 cursor-help">
              tooltip on text
            </span>
          </Tooltip>
          that provides additional context.
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.my-tooltip .tooltip-content {
  background: #667eea !important;
  color: white !important;
  border-color: #667eea !important;
  border-radius: 12px !important;
}

.my-tooltip .tooltip-arrow {
  background: #667eea !important;
  border-color: #667eea !important;
}

.my-wide-tooltip .tooltip-content {
  background: #059669 !important;
  color: white !important;
  border-color: #047857 !important;
}

.my-wide-tooltip .tooltip-arrow {
  background: #059669 !important;
  border-color: #047857 !important;
}

.my-gradient-tooltip .tooltip-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  border: none !important;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4) !important;
}

.my-gradient-tooltip .tooltip-arrow {
  background: #667eea !important;
  border: none !important;
}
</style>
