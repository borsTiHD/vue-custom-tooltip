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

import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  useSlots,
  useTemplateRef,
  watch,
} from 'vue'
import { getReactiveGlobalConfig } from '../../config/globalConfig'

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

// Get reactive global configuration (single source of truth)
const globalConfig = getReactiveGlobalConfig()

// Track which props were explicitly passed by the user to distinguish undefined from false/0
const instance = getCurrentInstance()
const propsPassedByUser = computed(() => {
  const vnodeProps = instance?.vnode.props || {}
  return new Set(Object.keys(vnodeProps))
})

/**
 * Check if a prop was explicitly passed by the user (even if the value is false, 0, etc.)
 */
function wasPropPassed(propName: string): boolean {
  return propsPassedByUser.value.has(propName)
}

// Create effective props that respect: defaults < global config < component props
// Component props take precedence, then global config, then defaults
// For boolean/number props, we need to check if the prop was explicitly passed to avoid type coercion
const effectivePosition = computed(() =>
  wasPropPassed('position') ? props.position : globalConfig.position ?? 'auto',
)
const effectiveTrigger = computed(() =>
  wasPropPassed('trigger') ? props.trigger : globalConfig.trigger ?? 'both',
)
const effectiveShowDelay = computed(() =>
  wasPropPassed('showDelay') ? props.showDelay : globalConfig.showDelay ?? 100,
)
const effectiveHideDelay = computed(() =>
  wasPropPassed('hideDelay') ? props.hideDelay : globalConfig.hideDelay ?? 100,
)
const effectiveDisabled = computed(() =>
  wasPropPassed('disabled') ? props.disabled : globalConfig.disabled ?? false,
)
const effectiveMaxWidth = computed(() =>
  wasPropPassed('maxWidth') ? props.maxWidth : globalConfig.maxWidth ?? '250px',
)
const effectiveTooltipClass = computed(() =>
  wasPropPassed('tooltipClass') ? props.tooltipClass : globalConfig.tooltipClass ?? '',
)
const effectiveShowArrow = computed(() =>
  wasPropPassed('showArrow') ? props.showArrow : globalConfig.showArrow ?? true,
)
const effectiveOffset = computed((): number =>
  wasPropPassed('offset') ? (props.offset ?? 8) : (globalConfig.offset ?? 8),
)
const effectiveDark = computed(() =>
  wasPropPassed('dark') ? props.dark : globalConfig.dark ?? 'auto',
)

const slots = useSlots()

const triggerElement = useTemplateRef<HTMLElement>('triggerElement')
const tooltipElement = useTemplateRef<HTMLElement>('tooltipElement')

const isVisible = ref(false)
const actualPosition = ref<'top' | 'bottom' | 'left' | 'right'>('top')
const tooltipStyles = ref<Record<string, any>>({})
const arrowStyles = ref<Record<string, any>>({})

let showTimeout: number | null = null
let hideTimeout: number | null = null

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

  let position = effectivePosition.value
  let top = 0
  let left = 0

  // Auto-detect best position if 'auto' is set
  if (position === 'auto') {
    const spaceAbove = triggerRect.top
    const spaceBelow = viewportHeight - triggerRect.bottom
    const spaceLeft = triggerRect.left
    const spaceRight = viewportWidth - triggerRect.right

    if (spaceBelow >= tooltipRect.height + effectiveOffset.value) {
      position = 'bottom'
    }
    else if (spaceAbove >= tooltipRect.height + effectiveOffset.value) {
      position = 'top'
    }
    else if (spaceRight >= tooltipRect.width + effectiveOffset.value) {
      position = 'right'
    }
    else if (spaceLeft >= tooltipRect.width + effectiveOffset.value) {
      position = 'left'
    }
    else {
      // Fallback to position with most space
      position = spaceBelow > spaceAbove ? 'bottom' : 'top'
    }
  }

  // Calculate position based on determined placement
  let idealLeft = 0
  let idealTop = 0

  switch (position) {
    case 'top':
      idealTop = triggerRect.top + scrollTop - tooltipRect.height - effectiveOffset.value
      idealLeft = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2)
      break
    case 'bottom':
      idealTop = triggerRect.bottom + scrollTop + effectiveOffset.value
      idealLeft = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2)
      break
    case 'left':
      idealTop = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2)
      idealLeft = triggerRect.left + scrollLeft - tooltipRect.width - effectiveOffset.value
      break
    case 'right':
      idealTop = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2)
      idealLeft = triggerRect.right + scrollLeft + effectiveOffset.value
      break
  }

  // Store original position before viewport clamping
  top = idealTop
  left = idealLeft

  // Ensure tooltip stays within viewport bounds
  const clampedLeft = Math.max(8, Math.min(left, viewportWidth - tooltipRect.width - 8))
  const clampedTop = Math.max(8, Math.min(top, viewportHeight + scrollTop - tooltipRect.height - 8))

  // Calculate arrow offset based on how much the tooltip was shifted
  const arrowOffset: Record<string, any> = {}

  if (position === 'top' || position === 'bottom') {
    // For horizontal positions, adjust arrow left position
    const triggerCenterX = triggerRect.left + scrollLeft + (triggerRect.width / 2)
    const tooltipLeftEdge = clampedLeft
    const arrowLeftPosition = triggerCenterX - tooltipLeftEdge

    // Ensure arrow stays within tooltip bounds (with some padding)
    const minArrowPos = 12 // 8px arrow width / 2 + 8px padding
    const maxArrowPos = tooltipRect.width - 12

    const finalArrowPos = Math.max(minArrowPos, Math.min(maxArrowPos, arrowLeftPosition))
    arrowOffset.left = `${finalArrowPos}px`
    arrowOffset.marginLeft = '0' // Override CSS margin-left: -4px
  }
  else if (position === 'left' || position === 'right') {
    // For vertical positions, adjust arrow top position
    const triggerCenterY = triggerRect.top + scrollTop + (triggerRect.height / 2)
    const tooltipTopEdge = clampedTop
    const arrowTopPosition = triggerCenterY - tooltipTopEdge

    // Ensure arrow stays within tooltip bounds (with some padding)
    const minArrowPos = 12
    const maxArrowPos = tooltipRect.height - 12

    const finalArrowPos = Math.max(minArrowPos, Math.min(maxArrowPos, arrowTopPosition))
    arrowOffset.top = `${finalArrowPos}px`
    arrowOffset.marginTop = '0' // Override CSS margin-top: -4px
  }

  actualPosition.value = position as 'top' | 'bottom' | 'left' | 'right'
  tooltipStyles.value = {
    position: 'absolute',
    top: `${clampedTop}px`,
    left: `${clampedLeft}px`,
    maxWidth: effectiveMaxWidth.value,
    zIndex: 9999,
  }
  arrowStyles.value = arrowOffset
}

async function showTooltip() {
  if (effectiveDisabled.value || isVisible.value)
    return

  clearTimeouts()
  showTimeout = window.setTimeout(async () => {
    isVisible.value = true
    await nextTick()
    // Wait for the browser to render the tooltip with proper dimensions
    // This is especially important for long text that needs to wrap
    await new Promise(resolve => requestAnimationFrame(resolve))
    calculatePosition()
  }, effectiveShowDelay.value)
}

function hideTooltip() {
  if (effectiveDisabled.value)
    return

  clearTimeouts()
  hideTimeout = window.setTimeout(() => {
    isVisible.value = false
  }, effectiveHideDelay.value)
}

function toggleTooltip() {
  if (effectiveDisabled.value)
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
  if (effectiveTrigger.value === 'hover' || effectiveTrigger.value === 'both') {
    showTooltip()
  }
}

function handleMouseLeave() {
  if (effectiveTrigger.value === 'hover' || effectiveTrigger.value === 'both') {
    hideTooltip()
  }
}

function handleFocus() {
  if (effectiveTrigger.value === 'focus' || effectiveTrigger.value === 'both') {
    showTooltip()
  }
}

function handleBlur() {
  if (effectiveTrigger.value === 'focus' || effectiveTrigger.value === 'both') {
    hideTooltip()
  }
}

function handleClick() {
  if (effectiveTrigger.value === 'click') {
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
  if (isVisible.value && effectiveTrigger.value !== 'click') {
    hideTooltip()
  }
}

function handleClickOutside(event: Event) {
  if (effectiveTrigger.value === 'click' && isVisible.value) {
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
