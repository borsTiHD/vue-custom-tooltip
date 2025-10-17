<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="p-8 space-y-8">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
      Tooltip Directive Examples
    </h2>

    <!-- Basic usage -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Basic Usage
      </h3>
      <div class="flex gap-4 items-center">
        <Button v-tooltip="'This is a simple tooltip'" label="Hover me" />

        <Button
          v-tooltip="'This tooltip has a longer message to demonstrate text wrapping'"
          label="Long tooltip"
        />
      </div>
    </div>

    <!-- Auto mode (default) -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Auto Mode (Default)
      </h3>
      <div class="flex gap-4 items-center">
        <Button v-tooltip="'Auto mode (default)'" label="v-tooltip (auto)" />
        <Button v-tooltip.dark="'Always dark tooltip'" label="v-tooltip.dark" />
        <Button v-tooltip.light="'Always light tooltip'" label="v-tooltip.light" />
      </div>
    </div>

    <!-- Using modifiers for positioning -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Positioning with Modifiers
      </h3>
      <div class="flex gap-4 items-center">
        <Button v-tooltip.top="'This tooltip appears on top'" label="Top" />
        <Button v-tooltip.bottom="'This tooltip appears at the bottom'" label="Bottom" />
        <Button v-tooltip.left="'This tooltip appears on the left'" label="Left" />
        <Button v-tooltip.right="'This tooltip appears on the right'" label="Right" />
        <Button v-tooltip.auto="'This tooltip is automatically positioned'" label="Auto" />
      </div>
    </div>

    <!-- Using modifiers for trigger behavior -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Trigger Behavior with Modifiers
      </h3>
      <div class="flex gap-4 items-center">
        <Button v-tooltip.hover="'Only on hover'" label="Hover only" />
        <Button v-tooltip.focus="'Only on focus (Tab)'" label="Focus only" />
        <Button v-tooltip.both="'Both on hover and focus'" label="Both" />
        <Button v-tooltip.click="'Click to toggle'" label="Click to toggle" />
      </div>
    </div>

    <!-- Using modifiers for timing -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Timing with Modifiers
      </h3>
      <div class="flex gap-4 items-center">
        <Button v-tooltip.fast="'Fast tooltip (10ms)'" label="Fast" />
        <Button v-tooltip.slow="'Slow tooltip (1000ms)'" label="Slow" />
      </div>
    </div>

    <!-- Complex configuration with object syntax -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Complex Configuration (Object Syntax)
      </h3>
      <div class="flex gap-4 items-center">
        <Button
          v-tooltip="{
            content: 'Custom configured tooltip',
            position: 'top',
            trigger: 'hover',
            showDelay: 500,
            hideDelay: 100,
            maxWidth: '300px',
          }"
          label="Custom config"
        />

        <Button
          v-tooltip="{
            content: 'Disabled tooltip',
            disabled: true,
          }"
          label="Disabled"
        />
      </div>
    </div>

    <!-- Combined modifiers -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Combined Modifiers
      </h3>
      <div class="flex gap-4 items-center">
        <Button
          v-tooltip.top.fast="'This tooltip appears on top and is fast'"
          label="Top + Fast"
        />

        <Button
          v-tooltip.click.slow="'This tooltip appears on click and is slow'"
          label="Click + Slow"
        />

        <Button
          v-tooltip.left.both="'This tooltip appears on the left and is shown on both hover and focus'"
          label="Left + Both"
        />
      </div>
    </div>

    <!-- Text elements -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Text Elements
      </h3>
      <div class="space-y-2">
        <p class="text-gray-700 dark:text-gray-300">
          This is an example of
          <span
            v-tooltip="'Helpful explanation'"
            class="underline decoration-dotted text-blue-600 dark:text-blue-400 cursor-help"
          >
            Tooltip on text
          </span>
          that provides additional context.
        </p>

        <p class="text-gray-700 dark:text-gray-300">
          You can also add tooltips to
          <a
            v-tooltip.bottom="'Link description'"
            href="#"
            class="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Links with tooltips
          </a>
          in a text element.
        </p>
      </div>
    </div>

    <!-- Form elements -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Form Elements
      </h3>
      <div class="flex gap-4 items-center">
        <input
          v-tooltip.focus="'Input your name here'"
          type="text"
          placeholder="Name"
          class="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        >

        <select
          v-tooltip.top.both="'Select an option'"
          class="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
    </div>

    <!-- Icons and small elements -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Icons and Small Elements
      </h3>
      <div class="flex gap-4 items-center">
        <span
          v-tooltip="'Information icon'"
          class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm cursor-help"
        >
          ℹ
        </span>

        <span
          v-tooltip.right="'Help icon'"
          class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm cursor-help"
        >
          ?
        </span>

        <span
          v-tooltip.top="'Warning'"
          class="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm cursor-help"
        >
          ⚠
        </span>
      </div>
    </div>
  </div>
</template>
