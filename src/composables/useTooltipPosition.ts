import type { ComputedRef, Ref } from 'vue'
import { ref } from 'vue'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto'
export type ActualPosition = 'top' | 'bottom' | 'left' | 'right'

/**
 * Composable for calculating and managing tooltip positioning
 *
 * @param triggerElement - Ref to the trigger element
 * @param tooltipElement - Ref to the tooltip element
 * @param position - Computed property for desired position
 * @param offset - Computed property for offset from trigger
 * @param maxWidth - Computed property for max width
 * @returns Object containing position state and calculation function
 */
export function useTooltipPosition(
  triggerElement: Ref<HTMLElement | undefined | null>,
  tooltipElement: Ref<HTMLElement | undefined | null>,
  position: ComputedRef<TooltipPosition>,
  offset: ComputedRef<number>,
  maxWidth: ComputedRef<string>,
) {
  const actualPosition = ref<ActualPosition>('top')
  const tooltipStyles = ref<Record<string, any>>({})
  const arrowStyles = ref<Record<string, any>>({})

  /**
   * Auto-detects the best position for the tooltip based on available space
   */
  function detectBestPosition(
    triggerRect: DOMRect,
    tooltipRect: DOMRect,
    viewportHeight: number,
    viewportWidth: number,
  ): ActualPosition {
    const spaceAbove = triggerRect.top
    const spaceBelow = viewportHeight - triggerRect.bottom
    const spaceLeft = triggerRect.left
    const spaceRight = viewportWidth - triggerRect.right

    const requiredSpace = offset.value

    if (spaceBelow >= tooltipRect.height + requiredSpace) {
      return 'bottom'
    }
    else if (spaceAbove >= tooltipRect.height + requiredSpace) {
      return 'top'
    }
    else if (spaceRight >= tooltipRect.width + requiredSpace) {
      return 'right'
    }
    else if (spaceLeft >= tooltipRect.width + requiredSpace) {
      return 'left'
    }
    else {
      // Fallback to position with most space
      return spaceBelow > spaceAbove ? 'bottom' : 'top'
    }
  }

  /**
   * Calculates the ideal position coordinates based on placement
   */
  function calculateIdealPosition(
    placement: ActualPosition,
    triggerRect: DOMRect,
    tooltipRect: DOMRect,
    scrollTop: number,
    scrollLeft: number,
  ): { top: number, left: number } {
    let idealTop = 0
    let idealLeft = 0

    // Calculate trigger edges and center in absolute coordinates
    const triggerTopAbs = triggerRect.top + scrollTop
    const triggerBottomAbs = triggerRect.bottom + scrollTop
    const triggerLeftAbs = triggerRect.left + scrollLeft
    const triggerRightAbs = triggerRect.right + scrollLeft
    const triggerCenterX = triggerLeftAbs + (triggerRect.width / 2)
    const triggerCenterY = triggerTopAbs + (triggerRect.height / 2)

    switch (placement) {
      case 'top':
        idealTop = triggerTopAbs - tooltipRect.height - offset.value
        idealLeft = triggerCenterX - (tooltipRect.width / 2)
        break
      case 'bottom':
        idealTop = triggerBottomAbs + offset.value
        idealLeft = triggerCenterX - (tooltipRect.width / 2)
        break
      case 'left':
        idealTop = triggerCenterY - (tooltipRect.height / 2)
        idealLeft = triggerLeftAbs - tooltipRect.width - offset.value
        break
      case 'right':
        idealTop = triggerCenterY - (tooltipRect.height / 2)
        idealLeft = triggerRightAbs + offset.value
        break
    }

    return { top: idealTop, left: idealLeft }
  }

  /**
   * Calculates arrow offset to point at the trigger element
   */
  function calculateArrowOffset(
    placement: ActualPosition,
    triggerRect: DOMRect,
    tooltipRect: DOMRect,
    clampedLeft: number,
    clampedTop: number,
    scrollTop: number,
    scrollLeft: number,
  ): Record<string, any> {
    const arrowOffset: Record<string, any> = {}

    if (placement === 'top' || placement === 'bottom') {
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
    else if (placement === 'left' || placement === 'right') {
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

    return arrowOffset
  }

  /**
   * Calculates and updates the tooltip position and styles
   */
  function calculate() {
    if (!triggerElement.value || !tooltipElement.value)
      return

    const triggerRect = triggerElement.value.getBoundingClientRect()
    const tooltipRect = tooltipElement.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    const scrollTop = window.scrollY
    const scrollLeft = window.scrollX

    // Determine the actual position
    let finalPosition: ActualPosition
    if (position.value === 'auto') {
      finalPosition = detectBestPosition(triggerRect, tooltipRect, viewportHeight, viewportWidth)
    }
    else {
      finalPosition = position.value as ActualPosition
    }

    // Calculate ideal position
    const { top, left } = calculateIdealPosition(
      finalPosition,
      triggerRect,
      tooltipRect,
      scrollTop,
      scrollLeft,
    )

    // Ensure tooltip stays within viewport bounds
    const clampedLeft = Math.max(8 + scrollLeft, Math.min(left, viewportWidth + scrollLeft - tooltipRect.width - 8))
    const clampedTop = Math.max(8 + scrollTop, Math.min(top, viewportHeight + scrollTop - tooltipRect.height - 8))

    // Calculate arrow offset based on how much the tooltip was shifted
    const arrowOffset = calculateArrowOffset(
      finalPosition,
      triggerRect,
      tooltipRect,
      clampedLeft,
      clampedTop,
      scrollTop,
      scrollLeft,
    )

    // Update reactive state
    actualPosition.value = finalPosition
    tooltipStyles.value = {
      position: 'absolute',
      top: `${clampedTop}px`,
      left: `${clampedLeft}px`,
      maxWidth: maxWidth.value,
      zIndex: 9999,
    }
    arrowStyles.value = arrowOffset
  }

  // Initialize tooltip styles with off-screen position for proper initial measurement
  tooltipStyles.value = {
    position: 'absolute',
    top: '-9999px',
    left: '-9999px',
    maxWidth: maxWidth.value,
    zIndex: 9999,
  }

  return {
    actualPosition,
    tooltipStyles,
    arrowStyles,
    calculate,
  }
}
