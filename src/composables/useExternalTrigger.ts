import type { ComputedRef, Ref } from 'vue'
import { onUnmounted, watch } from 'vue'

/**
 * Event handler functions returned from useTooltipEvents
 */
interface EventHandlers {
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  handleFocus: () => void
  handleBlur: () => void
  handleClick: () => void
  handleKeydown: (event: KeyboardEvent) => void
}

/**
 * Composable for managing external trigger element event listeners and ARIA attributes
 * Used in directive mode where the trigger element is not part of the tooltip component
 *
 * @param externalTrigger - Ref to the external trigger element (HTMLElement or undefined)
 * @param tooltipId - Unique ID for the tooltip (for ARIA attributes)
 * @param isVisible - Ref to visibility state
 * @param triggerType - Ref to trigger type ('hover', 'focus', 'both', 'click')
 * @param eventHandlers - Event handler functions from useTooltipEvents
 */
export function useExternalTrigger(
  externalTrigger: ComputedRef<HTMLElement | undefined>,
  tooltipId: string,
  isVisible: ComputedRef<boolean>,
  triggerType: ComputedRef<string>,
  eventHandlers: EventHandlers,
) {
  const {
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleClick,
    handleKeydown,
  } = eventHandlers

  /**
   * Add event listeners to the external trigger element
   */
  function addEventListeners(element: HTMLElement) {
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('focusin', handleFocus)
    element.addEventListener('focusout', handleBlur)
    element.addEventListener('click', handleClick)
    element.addEventListener('keydown', handleKeydown)
  }

  /**
   * Remove event listeners from the external trigger element
   */
  function removeEventListeners(element: HTMLElement) {
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
    element.removeEventListener('focusin', handleFocus)
    element.removeEventListener('focusout', handleBlur)
    element.removeEventListener('click', handleClick)
    element.removeEventListener('keydown', handleKeydown)
  }

  /**
   * Update ARIA attributes on the external trigger element
   */
  function updateAriaAttributes(element: HTMLElement, visible: boolean, trigger: string) {
    if (visible) {
      element.setAttribute('aria-describedby', tooltipId)
    }
    else {
      element.removeAttribute('aria-describedby')
    }

    if (trigger === 'click') {
      element.setAttribute('aria-expanded', String(visible))
    }
    else {
      element.removeAttribute('aria-expanded')
    }
  }

  /**
   * Clean up ARIA attributes from the external trigger element
   */
  function cleanupAriaAttributes(element: HTMLElement) {
    element.removeAttribute('aria-describedby')
    element.removeAttribute('aria-expanded')
  }

  // Setup event listeners for external trigger element (directive mode)
  watch(externalTrigger, (newTrigger, oldTrigger) => {
    // Remove old listeners
    if (oldTrigger) {
      removeEventListeners(oldTrigger)
      cleanupAriaAttributes(oldTrigger)
    }

    // Add new listeners
    if (newTrigger) {
      addEventListeners(newTrigger)
    }
  }, { immediate: true })

  // Update ARIA attributes on external trigger when visibility changes
  watch([externalTrigger, isVisible, triggerType], ([trigger, visible, trigger_type]) => {
    if (trigger) {
      updateAriaAttributes(trigger, visible, trigger_type)
    }
  })

  // Cleanup listeners on unmount
  onUnmounted(() => {
    if (externalTrigger.value) {
      removeEventListeners(externalTrigger.value)
      cleanupAriaAttributes(externalTrigger.value)
    }
  })
}
