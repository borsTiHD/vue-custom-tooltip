<script setup lang="ts">
import Button from '@/components/Button.vue'

import Tooltip from './Tooltip.vue'
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
      <div class="flex gap-4 items-center">
        <Tooltip
          content="Custom width tooltip with long text to show wrapping. This tooltip has a max-width of 400px and custom styles."
          max-width="400px"
          tooltip-class="my-tooltip"
        >
          <Button label="Wide tooltip" />
        </Tooltip>

        <Tooltip content="Disabled tooltip" disabled>
          <Button label="Disabled tooltip" />
        </Tooltip>
      </div>
    </div>

    <!-- Positioning -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Positioning
      </h3>
      <div class="flex gap-4 items-center">
        <!-- Tooltip oben -->
        <Tooltip content="Erscheint oben" position="top">
          <Button label="Tooltip oben" />
        </Tooltip>

        <!-- Tooltip links -->
        <Tooltip content="Erscheint links" position="left">
          <Button label="Tooltip links" />
        </Tooltip>

        <!-- Tooltip rechts -->
        <Tooltip content="Erscheint rechts" position="right">
          <Button label="Tooltip rechts" />
        </Tooltip>

        <!-- Tooltip unten -->
        <Tooltip content="Erscheint unten" position="bottom">
          <Button label="Tooltip unten" />
        </Tooltip>

        <!-- Automatische Positionierung -->
        <Tooltip content="Automatisch positioniert" position="auto">
          <Button label="Auto-Position" />
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.my-tooltip .tooltip-arrow {
  background: #667eea;
  border: none;
}
</style>
