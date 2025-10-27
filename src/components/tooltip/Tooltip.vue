<script setup lang="ts">
/**
 * Usage Examples:
 *
 * Basic usage with text content:
 * <Tooltip content="Simple tooltip text">
 *   <Button label="Hover me" />
 * </Tooltip>
 *
 * Click trigger:
 * <Tooltip content="Click to toggle" trigger="click">
 *   <Button label="Click me" />
 * </Tooltip>
 *
 * Custom delays:
 * <Tooltip
 *   content="Fast tooltip"
 *   :show-delay="100"
 *   :hide-delay="50"
 * >
 *   <Button label="Fast" />
 * </Tooltip>
 *
 * Rich content with slots:
 * <Tooltip>
 *   <Button label="Rich content" />
 *   <template #content>
 *     <div class="space-y-2">
 *       <h4>Rich Tooltip</h4>
 *       <p>With <strong>formatted</strong> content</p>
 *     </div>
 *   </template>
 * </Tooltip>
 *
 * Accessibility Features:
 * - Keyboard navigation support (Tab to focus, Escape to close)
 * - Screen reader compatible
 * - Proper ARIA attributes (aria-describedby, role="tooltip")
 * - Focus management
 * - Unique IDs for tooltip-trigger association
 */

import type { TooltipProps, TooltipSlots } from '../../types/tooltip'
import { computed, nextTick, useSlots, useTemplateRef, watch } from 'vue'

import {
  useExternalTrigger,
  useTooltipEvents,
  useTooltipPosition,
  useTooltipProps,
  useTooltipVisibility,
} from '../../composables'

/**
 * Generic Tooltip Component
 *
 * A flexible tooltip component built with Vue 3 Composition API and Teleport.
 * Supports multiple trigger modes, customizable delays, positioning, and rich content.
 * No external dependencies except Vue 3.
 */

// Re-export types for external use
export type { TooltipProps, TooltipSlots }

const props = withDefaults(defineProps<TooltipProps>(), {
  position: undefined,
  trigger: undefined,
  showDelay: undefined,
  hideDelay: undefined,
  disabled: undefined,
  maxWidth: undefined,
  tooltipClass: undefined,
  showArrow: undefined,
  offset: undefined,
  dark: undefined,
  externalTrigger: undefined,
})
defineSlots<{
  default: () => any
  content?: () => any
}>()

// Generate unique ID for accessibility
function generateTooltipId() {
  const randomPart = Math.random().toString(36).substring(2, 9)
  return `tooltip-${randomPart}`
}

const slots = useSlots()

// Generate unique ID for ARIA attributes
const tooltipId = generateTooltipId()

// Element refs
const internalTriggerElement = useTemplateRef<HTMLElement>('internalTrigger')
const tooltipElement = useTemplateRef<HTMLElement>('tooltipElement')

// Use external trigger if provided (directive mode), otherwise use internal trigger
const externalTrigger = computed(() => props.externalTrigger)
const triggerElement = computed(() => externalTrigger.value || internalTriggerElement.value)

// Composables
const {
  effectivePosition,
  effectiveTrigger,
  effectiveShowDelay,
  effectiveHideDelay,
  effectiveDisabled,
  effectiveMaxWidth,
  effectiveTooltipClass,
  effectiveShowArrow,
  effectiveOffset,
  effectiveDark,
} = useTooltipProps(props)

const {
  actualPosition,
  tooltipStyles,
  arrowStyles,
  calculate: calculatePosition,
} = useTooltipPosition(
  triggerElement,
  tooltipElement,
  effectivePosition,
  effectiveOffset,
  effectiveMaxWidth,
)

const {
  isVisible,
  show,
  hide,
  toggle,
} = useTooltipVisibility(
  effectiveDisabled,
  effectiveShowDelay,
  effectiveHideDelay,
  calculatePosition,
)

const {
  handleMouseEnter,
  handleMouseLeave,
  handleFocus,
  handleBlur,
  handleClick,
  handleKeydown,
} = useTooltipEvents(
  triggerElement,
  tooltipElement,
  isVisible,
  effectiveTrigger,
  show,
  hide,
  toggle,
  calculatePosition,
)

// Computed properties
const hasContentSlot = computed(() => !!slots.content)

const tooltipClasses = computed(() => [
  'custom-tooltip',
  `tooltip-${actualPosition.value}`,
  {
    'tooltip-visible': isVisible.value,
    'tooltip-with-arrow': effectiveShowArrow.value,
    'tooltip-dark': effectiveDark.value === true,
    'tooltip-light': effectiveDark.value === false,
    'tooltip-auto': effectiveDark.value === 'auto',
  },
  effectiveTooltipClass.value,
])

// Watch for position changes to recalculate
watch([isVisible, effectivePosition], async () => {
  if (isVisible.value) {
    await nextTick()
    // Wait for the browser to render the tooltip with proper dimensions
    await new Promise(resolve => requestAnimationFrame(resolve))
    calculatePosition()
  }
})

// Setup event listeners and ARIA attributes for external trigger element (directive mode)
useExternalTrigger(
  externalTrigger,
  tooltipId,
  isVisible,
  effectiveTrigger,
  {
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleClick,
    handleKeydown,
  },
)
</script>

<template>
  <!-- Internal trigger element (component mode only) -->
  <div v-if="!externalTrigger" class="tooltip-wrapper">
    <div
      ref="internalTrigger"
      class="tooltip-trigger"
      :aria-describedby="isVisible ? tooltipId : undefined"
      :aria-expanded="effectiveTrigger === 'click' ? isVisible : undefined"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focusin="handleFocus"
      @focusout="handleBlur"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <slot />
    </div>
  </div>

  <!-- Custom tooltip -->
  <Teleport to="body">
    <Transition name="tooltip-fade">
      <div
        v-if="isVisible"
        :id="tooltipId"
        ref="tooltipElement"
        :class="tooltipClasses"
        :style="tooltipStyles"
        role="tooltip"
        aria-live="polite"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="tooltip-content">
          <slot v-if="hasContentSlot" name="content" />
          <span v-else-if="props.content" v-text="props.content" />
        </div>
        <div v-if="effectiveShowArrow" class="tooltip-arrow" :style="arrowStyles" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.tooltip-wrapper {
  display: inline-block;
}

.tooltip-trigger {
  outline: none;
}

.tooltip-trigger:focus-visible {
  outline: 2px solid var(--vct-focus-color, #3b82f6);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Vue Transition Classes */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}

.tooltip-fade-enter-to,
.tooltip-fade-leave-from {
  opacity: 1;
}

/* Custom Tooltip Styles */
.custom-tooltip {
  position: absolute;
  pointer-events: none;
  word-wrap: break-word;
  z-index: 9999;
}

.custom-tooltip.tooltip-visible {
  pointer-events: auto;
}

.tooltip-content {
  padding: 8px 12px;
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--vct-text-color, #374151);
  background: var(--vct-background, #ffffff);
  border: 1px solid var(--vct-border-color, #d1d5db);
  border-radius: var(--vct-border-radius, 8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 100%;
}

/* Arrow Styles */
.tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--vct-background, #ffffff);
  border: 1px solid var(--vct-border-color, #d1d5db);
  transform: rotate(45deg);
}

/* Arrow positioning for different tooltip positions */
/* Note: left/top can be overridden by inline styles for dynamic positioning */
.tooltip-top .tooltip-arrow {
  bottom: -5px;
  left: 50%;
  margin-left: -4px;
  border-top: none;
  border-left: none;
}

.tooltip-bottom .tooltip-arrow {
  top: -5px;
  left: 50%;
  margin-left: -4px;
  border-bottom: none;
  border-right: none;
}

.tooltip-left .tooltip-arrow {
  right: -5px;
  top: 50%;
  margin-top: -4px;
  border-left: none;
  border-bottom: none;
}

.tooltip-right .tooltip-arrow {
  left: -5px;
  top: 50%;
  margin-top: -4px;
  border-right: none;
  border-top: none;
}

/* Animation for different positions */
.custom-tooltip.tooltip-top {
  transform-origin: bottom center;
}

.custom-tooltip.tooltip-bottom {
  transform-origin: top center;
}

.custom-tooltip.tooltip-left {
  transform-origin: right center;
}

.custom-tooltip.tooltip-right {
  transform-origin: left center;
}

/* Dark theme support - Force dark mode */
.tooltip-dark .tooltip-content {
  background: var(--vct-background-dark, #2a2a2a);
  border-color: var(--vct-border-color-dark, #444);
  color: var(--vct-text-color-dark, #e0e0e0);
}

.tooltip-dark .tooltip-arrow {
  background: var(--vct-background-dark, #2a2a2a);
  border-color: var(--vct-border-color-dark, #444);
}

/* Light theme support - Force light mode (uses default styles, explicit override if needed) */
.tooltip-light .tooltip-content {
  background: var(--vct-background, #ffffff);
  border-color: var(--vct-border-color, #e0e0e0);
  color: var(--vct-text-color, #333333);
}

.tooltip-light .tooltip-arrow {
  background: var(--vct-background, #ffffff);
  border-color: var(--vct-border-color, #e0e0e0);
}

/* Auto mode - Responds to both prefers-color-scheme and Tailwind .dark class */
/* Priority: Tailwind .dark class > prefers-color-scheme */
/* Tailwind dark mode support - Works when .dark class is on html or body */
:global(.dark .tooltip-auto .tooltip-content) {
  background: var(--vct-background-dark, #2a2a2a);
  border-color: var(--vct-border-color-dark, #444);
  color: var(--vct-text-color-dark, #e0e0e0);
}

:global(.dark .tooltip-auto .tooltip-arrow) {
  background: var(--vct-background-dark, #2a2a2a);
  border-color: var(--vct-border-color-dark, #444);
}

/* Explicit light mode when .light class is present */
:global(.light .tooltip-auto .tooltip-content) {
  background: var(--vct-background, #ffffff);
  border-color: var(--vct-border-color, #e0e0e0);
  color: var(--vct-text-color, #333333);
}

:global(.light .tooltip-auto .tooltip-arrow) {
  background: var(--vct-background, #ffffff);
  border-color: var(--vct-border-color, #e0e0e0);
}

/* Fallback to prefers-color-scheme ONLY when neither .dark nor .light class is present */
/* Lower priority - only applies when Tailwind dark/light class is not set on any parent */
@media (prefers-color-scheme: dark) {
  :global(html:not(.dark):not(.light) .tooltip-auto .tooltip-content),
  :global(html:not(.dark):not(.light) body:not(.dark):not(.light) .tooltip-auto .tooltip-content) {
    background: var(--vct-background-dark, #2a2a2a);
    border-color: var(--vct-border-color-dark, #444);
    color: var(--vct-text-color-dark, #e0e0e0);
  }

  :global(html:not(.dark):not(.light) .tooltip-auto .tooltip-arrow),
  :global(html:not(.dark):not(.light) body:not(.dark):not(.light) .tooltip-auto .tooltip-arrow) {
    background: var(--vct-background-dark, #2a2a2a);
    border-color: var(--vct-border-color-dark, #444);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .tooltip-content {
    border-width: 2px;
    font-weight: 600;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .tooltip-fade-enter-active,
  .tooltip-fade-leave-active {
    transition: none;
  }

  .tooltip-fade-enter-from,
  .tooltip-fade-leave-to {
    transform: scale(1);
  }
}
</style>
