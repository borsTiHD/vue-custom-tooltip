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
 * - Proper ARIA attributes
 * - Focus management
 */

import type { TooltipProps, TooltipSlots } from '../../types/tooltip'
import { computed, nextTick, useSlots, useTemplateRef, watch } from 'vue'

import {
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
})

defineSlots<{
  default: () => any
  content?: () => any
}>()

const slots = useSlots()

// Element refs
const triggerElement = useTemplateRef<HTMLElement>('triggerElement')
const tooltipElement = useTemplateRef<HTMLElement>('tooltipElement')

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
</script>

<template>
  <div class="tooltip-wrapper">
    <!-- Trigger element -->
    <div
      ref="triggerElement"
      class="tooltip-trigger"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focusin="handleFocus"
      @focusout="handleBlur"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <slot />
    </div>

    <!-- Custom tooltip -->
    <Teleport to="body">
      <div
        v-if="isVisible"
        ref="tooltipElement"
        :class="tooltipClasses"
        :style="tooltipStyles"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="tooltip-content">
          <slot v-if="hasContentSlot" name="content" />
          <span v-else-if="props.content" v-text="props.content" />
        </div>
        <div v-if="effectiveShowArrow" class="tooltip-arrow" :style="arrowStyles" />
      </div>
    </Teleport>
  </div>
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

/* Custom Tooltip Styles */
.custom-tooltip {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  transform: scale(0.95);
  word-wrap: break-word;
  z-index: 9999;
}

.custom-tooltip.tooltip-visible {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
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
@media (prefers-color-scheme: dark) {
  .tooltip-auto .tooltip-content {
    background: var(--vct-background-dark, #2a2a2a);
    border-color: var(--vct-border-color-dark, #444);
    color: var(--vct-text-color-dark, #e0e0e0);
  }

  .tooltip-auto .tooltip-arrow {
    background: var(--vct-background-dark, #2a2a2a);
    border-color: var(--vct-border-color-dark, #444);
  }
}

/* Tailwind dark mode support - Targets tooltips only when html or body has .dark class */
:global(html.dark .tooltip-auto .tooltip-content),
:global(body.dark .tooltip-auto .tooltip-content) {
  background: var(--vct-background-dark, #2a2a2a);
  border-color: var(--vct-border-color-dark, #444);
  color: var(--vct-text-color-dark, #e0e0e0);
}

:global(html.dark .tooltip-auto .tooltip-arrow),
:global(body.dark .tooltip-auto .tooltip-arrow) {
  background: var(--vct-background-dark, #2a2a2a);
  border-color: var(--vct-border-color-dark, #444);
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
  .custom-tooltip {
    transition: none;
  }
}
</style>
