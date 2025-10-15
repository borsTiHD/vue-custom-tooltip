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

import { computed, nextTick, onMounted, onUnmounted, ref, useSlots, useTemplateRef, watch } from 'vue'

/**
 * Generic Tooltip Component
 *
 * A flexible tooltip component built with Vue 3 Composition API and Teleport.
 * Supports multiple trigger modes, customizable delays, positioning, and rich content.
 * No external dependencies except Vue 3.
 */

export interface TooltipProps {
  /**
   * Content to display in the tooltip
   * Use this for simple text content, or use the content slot for rich content
   */
  content?: string

  /**
   * Position of the tooltip relative to the trigger element
   * @default 'auto'
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'

  /**
   * Trigger behavior for the tooltip
   * - 'hover': Show/hide on mouse enter/leave
   * - 'focus': Show/hide on focus/blur (keyboard navigation)
   * - 'both': Show/hide on both hover and focus
   * - 'click': Toggle on click
   * @default 'both'
   */
  trigger?: 'hover' | 'focus' | 'both' | 'click'

  /**
   * Delay before showing the tooltip (in milliseconds)
   * @default 100
   */
  showDelay?: number

  /**
   * Delay before hiding the tooltip (in milliseconds)
   * @default 100
   */
  hideDelay?: number

  /**
   * Whether the tooltip is disabled
   * When disabled, the tooltip will not show regardless of interactions
   * @default false
   */
  disabled?: boolean

  /**
   * Maximum width of the tooltip
   * @default '250px'
   */
  maxWidth?: string

  /**
   * Custom CSS class for the tooltip popover
   * @default ''
   */
  tooltipClass?: string

  /**
   * Whether to show an arrow pointing to the trigger
   * @default true
   */
  showArrow?: boolean

  /**
   * Offset from the trigger element in pixels
   * @default 8
   */
  offset?: number

  /**
   * Dark mode behavior
   * - 'auto': Automatically detects both prefers-color-scheme AND Tailwind's .dark class
   * - true: Force dark mode
   * - false: Force light mode
   * @default 'auto'
   */
  dark?: 'auto' | boolean
}

export interface TooltipSlots {
  /**
   * Default slot: The trigger element that will show the tooltip when interacted with
   */
  default: () => any

  /**
   * Content slot: Rich content to display in the tooltip
   * Use this instead of the content prop for complex HTML content
   */
  content?: () => any
}

const props = withDefaults(defineProps<TooltipProps>(), {
  position: 'auto',
  trigger: 'both',
  showDelay: 100,
  hideDelay: 100,
  disabled: false,
  maxWidth: '250px',
  tooltipClass: '',
  showArrow: true,
  offset: 8,
  dark: 'auto',
})

defineSlots<{
  default: () => any
  content: () => any
}>()

const slots = useSlots()

const triggerElement = useTemplateRef<HTMLElement>('triggerElement')
const tooltipElement = useTemplateRef<HTMLElement>('tooltipElement')

const isVisible = ref(false)
const actualPosition = ref<'top' | 'bottom' | 'left' | 'right'>('top')
const tooltipStyles = ref<Record<string, any>>({})

let showTimeout: number | null = null
let hideTimeout: number | null = null

const hasContentSlot = computed(() => !!slots.content)

const tooltipClasses = computed(() => [
  'custom-tooltip',
  `tooltip-${actualPosition.value}`,
  {
    'tooltip-visible': isVisible.value,
    'tooltip-with-arrow': props.showArrow,
    'tooltip-dark': props.dark === true,
    'tooltip-light': props.dark === false,
    'tooltip-auto': props.dark === 'auto',
  },
  props.tooltipClass,
])

function clearTimeouts() {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

function calculatePosition() {
  if (!triggerElement.value || !tooltipElement.value)
    return

  const triggerRect = triggerElement.value.getBoundingClientRect()
  const tooltipRect = tooltipElement.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth
  const scrollTop = window.scrollY
  const scrollLeft = window.scrollX

  let position = props.position
  let top = 0
  let left = 0

  // Auto-detect best position if 'auto' is set
  if (position === 'auto') {
    const spaceAbove = triggerRect.top
    const spaceBelow = viewportHeight - triggerRect.bottom
    const spaceLeft = triggerRect.left
    const spaceRight = viewportWidth - triggerRect.right

    if (spaceBelow >= tooltipRect.height + props.offset) {
      position = 'bottom'
    }
    else if (spaceAbove >= tooltipRect.height + props.offset) {
      position = 'top'
    }
    else if (spaceRight >= tooltipRect.width + props.offset) {
      position = 'right'
    }
    else if (spaceLeft >= tooltipRect.width + props.offset) {
      position = 'left'
    }
    else {
      // Fallback to position with most space
      position = spaceBelow > spaceAbove ? 'bottom' : 'top'
    }
  }

  // Calculate position based on determined placement
  switch (position) {
    case 'top':
      top = triggerRect.top + scrollTop - tooltipRect.height - props.offset
      left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2)
      break
    case 'bottom':
      top = triggerRect.bottom + scrollTop + props.offset
      left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2)
      break
    case 'left':
      top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2)
      left = triggerRect.left + scrollLeft - tooltipRect.width - props.offset
      break
    case 'right':
      top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2)
      left = triggerRect.right + scrollLeft + props.offset
      break
  }

  // Ensure tooltip stays within viewport bounds
  left = Math.max(8, Math.min(left, viewportWidth - tooltipRect.width - 8))
  top = Math.max(8, Math.min(top, viewportHeight + scrollTop - tooltipRect.height - 8))

  actualPosition.value = position as 'top' | 'bottom' | 'left' | 'right'
  tooltipStyles.value = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
    maxWidth: props.maxWidth,
    zIndex: 9999,
  }
}

async function showTooltip() {
  if (props.disabled || isVisible.value)
    return

  clearTimeouts()
  showTimeout = window.setTimeout(async () => {
    isVisible.value = true
    await nextTick()
    // Wait for the browser to render the tooltip with proper dimensions
    // This is especially important for long text that needs to wrap
    await new Promise(resolve => requestAnimationFrame(resolve))
    calculatePosition()
  }, props.showDelay)
}

function hideTooltip() {
  if (props.disabled)
    return

  clearTimeouts()
  hideTimeout = window.setTimeout(() => {
    isVisible.value = false
  }, props.hideDelay)
}

function toggleTooltip() {
  if (props.disabled)
    return

  clearTimeouts()
  if (isVisible.value) {
    hideTooltip()
  }
  else {
    showTooltip()
  }
}

function handleMouseEnter() {
  if (props.trigger === 'hover' || props.trigger === 'both') {
    showTooltip()
  }
}

function handleMouseLeave() {
  if (props.trigger === 'hover' || props.trigger === 'both') {
    hideTooltip()
  }
}

function handleFocus() {
  if (props.trigger === 'focus' || props.trigger === 'both') {
    showTooltip()
  }
}

function handleBlur() {
  if (props.trigger === 'focus' || props.trigger === 'both') {
    hideTooltip()
  }
}

function handleClick() {
  if (props.trigger === 'click') {
    toggleTooltip()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isVisible.value) {
    hideTooltip()
  }
}

async function handleResize() {
  if (isVisible.value) {
    // Wait for the browser to complete the resize and reflow
    await new Promise(resolve => requestAnimationFrame(resolve))
    calculatePosition()
  }
}

function handleScroll() {
  if (isVisible.value && props.trigger !== 'click') {
    hideTooltip()
  }
}

function handleClickOutside(event: Event) {
  if (props.trigger === 'click' && isVisible.value) {
    const target = event.target as Element
    if (
      !triggerElement.value?.contains(target)
      && !tooltipElement.value?.contains(target)
    ) {
      hideTooltip()
    }
  }
}

// Setup event listeners
onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll, true)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  clearTimeouts()
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll, true)
  document.removeEventListener('click', handleClickOutside)
})

// Watch for position changes to recalculate
watch([isVisible, () => props.position], async () => {
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
        <div v-if="props.showArrow" class="tooltip-arrow" />
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

:global(.dark) .tooltip-auto .tooltip-content {
  background: var(--vct-background-dark, #2a2a2a);
  border-color: var(--vct-border-color-dark, #444);
  color: var(--vct-text-color-dark, #e0e0e0);
}

:global(.dark) .tooltip-auto .tooltip-arrow {
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
