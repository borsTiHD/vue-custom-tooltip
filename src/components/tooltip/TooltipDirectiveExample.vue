<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="p-8 space-y-8">
    <h2 class="text-2xl font-bold mb-6">
      Tooltip Directive Examples
    </h2>

    <!-- Basic usage -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">
        Basic Usage
      </h3>
      <div class="flex gap-4 items-center">
        <Button v-tooltip="'Dies ist ein einfacher Tooltip'" label="Hover me" />

        <Button
          v-tooltip="'Dieser Tooltip hat eine längere Nachricht um Textumbruch zu demonstrieren'"
          label="Long tooltip"
        />
      </div>
    </div>

    <!-- Using modifiers for positioning -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">
        Positioning with Modifiers
      </h3>
      <div class="flex gap-4 items-center">
        <Button v-tooltip.top="'Erscheint oben'" label="Top" />
        <Button v-tooltip.bottom="'Erscheint unten'" label="Bottom" />
        <Button v-tooltip.left="'Erscheint links'" label="Left" />
        <Button v-tooltip.right="'Erscheint rechts'" label="Right" />
        <Button v-tooltip.auto="'Automatisch positioniert'" label="Auto" />
      </div>
    </div>

    <!-- Using modifiers for trigger behavior -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">
        Trigger Behavior with Modifiers
      </h3>
      <div class="flex gap-4 items-center">
        <Button v-tooltip.hover="'Nur bei Hover'" label="Hover only" />
        <Button v-tooltip.focus="'Nur bei Focus (Tab)'" label="Focus only" />
        <Button v-tooltip.both="'Bei Hover und Focus'" label="Both" />
        <Button v-tooltip.click="'Klick zum Umschalten'" label="Click to toggle" />
      </div>
    </div>

    <!-- Using modifiers for timing -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">
        Timing with Modifiers
      </h3>
      <div class="flex gap-4 items-center">
        <Button v-tooltip.fast="'Schneller Tooltip (10ms)'" label="Fast" />
        <Button v-tooltip.slow="'Langsamer Tooltip (1000ms)'" label="Slow" />
      </div>
    </div>

    <!-- Complex configuration with object syntax -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">
        Complex Configuration (Object Syntax)
      </h3>
      <div class="flex gap-4 items-center">
        <Button
          v-tooltip="{
            content: 'Benutzerdefinierte Konfiguration',
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
            content: 'Deaktivierter Tooltip',
            disabled: true,
          }"
          label="Disabled"
        />
      </div>
    </div>

    <!-- Combined modifiers -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">
        Combined Modifiers
      </h3>
      <div class="flex gap-4 items-center">
        <Button
          v-tooltip.top.fast="'Oben und schnell'"
          label="Top + Fast"
        />

        <Button
          v-tooltip.click.slow="'Klick und langsam'"
          label="Click + Slow"
        />

        <Button
          v-tooltip.left.both="'Links mit Hover und Focus'"
          label="Left + Both"
        />
      </div>
    </div>

    <!-- Text elements -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">
        Text Elements
      </h3>
      <div class="space-y-2">
        <p>
          Dies ist ein Absatz mit einem
          <span
            v-tooltip="'Hilfreiche Erklärung'"
            class="underline decoration-dotted text-blue-600 cursor-help"
          >
            Tooltip auf Text
          </span>
          der zusätzlichen Kontext bietet.
        </p>

        <p>
          Sie können auch
          <a
            v-tooltip.bottom="'Link-Beschreibung'"
            href="#"
            class="text-blue-600 hover:underline"
          >
            Links mit Tooltips
          </a>
          versehen.
        </p>
      </div>
    </div>

    <!-- Form elements -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">
        Form Elements
      </h3>
      <div class="flex gap-4 items-center">
        <input
          v-tooltip.focus="'Geben Sie Ihren Namen ein'"
          type="text"
          placeholder="Name"
          class="border border-gray-300 rounded px-3 py-2"
        >

        <select
          v-tooltip.both="'Wählen Sie eine Option'"
          class="border border-gray-300 rounded px-3 py-2"
        >
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
    </div>

    <!-- Icons and small elements -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">
        Icons and Small Elements
      </h3>
      <div class="flex gap-4 items-center">
        <span
          v-tooltip="'Informations-Icon'"
          class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm cursor-help"
        >
          ℹ
        </span>

        <span
          v-tooltip.right="'Hilfe-Icon'"
          class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm cursor-help"
        >
          ?
        </span>

        <span
          v-tooltip.top="'Warnung'"
          class="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm cursor-help"
        >
          ⚠
        </span>
      </div>
    </div>
  </div>
</template>
