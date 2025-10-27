import type { ComputedRef, Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

export type TriggerType = 'hover' | 'focus' | 'both' | 'click'

export interface TooltipEventHandlers {
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  handleFocus: () => void
  handleBlur: () => void
  handleClick: () => void
  handleKeydown: (event: KeyboardEvent) => void
}

/**
 * Composable for managing tooltip event handlers and listeners
 *
 * @param triggerElement - Ref to the trigger element
 * @param tooltipElement - Ref to the tooltip element
 * @param isVisible - Ref to visibility state
 * @param trigger - Computed property for trigger type
 * @param show - Function to show the tooltip
 * @param hide - Function to hide the tooltip
 * @param toggle - Function to toggle the tooltip
 * @param onPositionUpdate - Callback to recalculate position
 * @returns Object containing event handler functions
 */
export function useTooltipEvents(
  triggerElement: Readonly<Ref<HTMLElement | undefined | null>>,
  tooltipElement: Readonly<Ref<HTMLElement | undefined | null>>,
  isVisible: ComputedRef<boolean>,
  trigger: ComputedRef<TriggerType>,
  show: () => void,
  hide: () => void,
  toggle: () => void,
  onPositionUpdate?: () => void | Promise<void>,
): TooltipEventHandlers {
  /**
   * Handle mouse enter event
   */
  function handleMouseEnter() {
    if (trigger.value === 'hover' || trigger.value === 'both') {
      show()
    }
  }

  /**
   * Handle mouse leave event
   */
  function handleMouseLeave() {
    if (trigger.value === 'hover' || trigger.value === 'both') {
      hide()
    }
  }

  /**
   * Handle focus event
   */
  function handleFocus() {
    if (trigger.value === 'focus' || trigger.value === 'both') {
      show()
    }
  }

  /**
   * Handle blur event
   */
  function handleBlur() {
    if (trigger.value === 'focus' || trigger.value === 'both') {
      hide()
    }
  }

  /**
   * Handle click event
   */
  function handleClick() {
    if (trigger.value === 'click') {
      toggle()
    }
  }

  /**
   * Handle keyboard events
   */
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isVisible.value) {
      hide()
    }
  }

  /**
   * Handle window resize event
   */
  async function handleResize() {
    if (isVisible.value && onPositionUpdate) {
      // Wait for the browser to complete the resize and reflow
      await new Promise(resolve => requestAnimationFrame(resolve))
      await onPositionUpdate()
    }
  }

  /**
   * Handle scroll event
   */
  function handleScroll() {
    if (isVisible.value && trigger.value !== 'click') {
      hide()
    }
  }

  /**
   * Handle click outside tooltip
   */
  function handleClickOutside(event: Event) {
    if (trigger.value === 'click' && isVisible.value) {
      const target = event.target as Element
      if (
        !triggerElement.value?.contains(target)
        && !tooltipElement.value?.contains(target)
      ) {
        hide()
      }
    }
  }

  // Setup global event listeners
  onMounted(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, true)
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleScroll, true)
    document.removeEventListener('click', handleClickOutside)
  })

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleClick,
    handleKeydown,
  }
}
