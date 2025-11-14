import type { ComputedRef } from 'vue'
import { computed, nextTick, onUnmounted, ref } from 'vue'

/**
 * Composable for managing tooltip visibility with configurable delays
 *
 * @param disabled - Computed property indicating if tooltip is disabled
 * @param showDelay - Computed property for show delay in milliseconds
 * @param hideDelay - Computed property for hide delay in milliseconds
 * @param onShow - Optional callback to execute when tooltip becomes visible
 * @returns Object containing visibility state and control functions
 */
export function useTooltipVisibility(
  disabled: ComputedRef<boolean>,
  showDelay: ComputedRef<number>,
  hideDelay: ComputedRef<number>,
  onShow?: () => void | Promise<void>,
) {
  const _isVisible = ref(false)
  const isVisible = computed(() => _isVisible.value)

  let showTimeout: number | null = null
  let hideTimeout: number | null = null

  /**
   * Clears any pending show/hide timeouts
   */
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

  /**
   * Shows the tooltip after the configured delay
   */
  async function show() {
    if (disabled.value || _isVisible.value)
      return

    clearTimeouts()
    showTimeout = window.setTimeout(async () => {
      _isVisible.value = true
      await nextTick()
      // Wait for the browser to render the tooltip with proper dimensions
      // This is especially important for long text that needs to wrap
      await new Promise(resolve => requestAnimationFrame(resolve))

      // Execute callback after tooltip is visible and rendered
      if (onShow) {
        await onShow()
      }
    }, showDelay.value)
  }

  /**
   * Shows the tooltip immediately without delay (for programmatic control)
   */
  async function showImmediate() {
    clearTimeouts()
    _isVisible.value = true
    await nextTick()
    // Wait for the browser to render the tooltip with proper dimensions
    await new Promise(resolve => requestAnimationFrame(resolve))

    // Execute callback after tooltip is visible and rendered
    if (onShow) {
      await onShow()
    }
  }

  /**
   * Hides the tooltip after the configured delay
   */
  function hide() {
    if (disabled.value)
      return

    clearTimeouts()
    hideTimeout = window.setTimeout(() => {
      _isVisible.value = false
    }, hideDelay.value)
  }

  /**
   * Hides the tooltip immediately without delay (for programmatic control)
   */
  function hideImmediate() {
    clearTimeouts()
    _isVisible.value = false
  }

  /**
   * Toggles the tooltip visibility
   */
  function toggle() {
    if (disabled.value)
      return

    clearTimeouts()
    if (_isVisible.value) {
      hide()
    }
    else {
      show()
    }
  }

  // Clean up timeouts on unmount
  onUnmounted(() => {
    clearTimeouts()
  })

  return {
    isVisible,
    show,
    hide,
    toggle,
    showImmediate,
    hideImmediate,
    clearTimeouts,
  }
}
