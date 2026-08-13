import type { ComputedRef, Ref } from 'vue'
import type { ActualPosition, TooltipPosition } from './useTooltipPosition'
import { computed, onScopeDispose, ref, watch } from 'vue'
import { isClient } from '../utils/ssr'

const ARROW_SIZE = 8
const ARROW_EDGE_PADDING = 12

/** Base placement per requested position. `auto` starts at the bottom and flips via fallbacks. */
const POSITION_AREA: Record<ActualPosition | 'auto', string> = {
  auto: 'bottom',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
}

/** Mirrors the priority order of `detectBestPosition()` in useTooltipPosition. */
const AUTO_FALLBACKS = '--vct-top, --vct-right, --vct-left'

let anchorCounter = 0

/**
 * Composable for positioning the tooltip with native CSS anchor positioning
 *
 * Placement, flipping and scroll tracking are handled entirely by the browser.
 * Only the arrow needs JavaScript: CSS cannot report which fallback position was
 * chosen, and `@position-try` does not accept custom properties.
 *
 * @param triggerElement - Ref to the trigger element
 * @param tooltipElement - Ref to the tooltip element
 * @param position - Computed property for desired position
 * @param offset - Computed property for offset from trigger
 * @param maxWidth - Computed property for max width
 * @param showArrow - Computed property for arrow visibility
 * @param enabled - Whether this strategy is currently active
 * @returns Object containing position state and the arrow synchronisation function
 */
export function useAnchorPosition(
  triggerElement: Readonly<Ref<HTMLElement | undefined | null>>,
  tooltipElement: Readonly<Ref<HTMLElement | undefined | null>>,
  position: ComputedRef<TooltipPosition>,
  offset: ComputedRef<number>,
  maxWidth: ComputedRef<string>,
  showArrow: ComputedRef<boolean>,
  enabled: ComputedRef<boolean>,
) {
  const anchorName = `--vct-a${++anchorCounter}`
  const actualPosition = ref<ActualPosition>('bottom')
  const arrowStyles = ref<Record<string, string>>({})

  const tooltipStyles = computed<Record<string, string>>(() => {
    const styles: Record<string, string> = {
      position: 'fixed',
      positionAnchor: anchorName,
      positionArea: POSITION_AREA[position.value],
      positionVisibility: 'anchor-visible',
      margin: `${offset.value}px`,
      maxWidth: maxWidth.value,
      zIndex: '9999',
    }

    if (position.value === 'auto') {
      styles.positionTryFallbacks = AUTO_FALLBACKS
    }

    return styles
  })

  let anchoredElement: HTMLElement | null = null

  function clearAnchorName() {
    anchoredElement?.style.removeProperty('anchor-name')
    anchoredElement = null
  }

  // In directive mode the trigger belongs to the consumer, so the property is removed again on teardown.
  watch([triggerElement, enabled], ([element, isEnabled]) => {
    if (anchoredElement && anchoredElement !== element) {
      clearAnchorName()
    }

    if (isClient && isEnabled && element) {
      element.style.setProperty('anchor-name', anchorName)
      anchoredElement = element
    }
    else {
      clearAnchorName()
    }
  }, { immediate: true })

  onScopeDispose(clearAnchorName)

  /**
   * Derives the side the browser placed the tooltip on by comparing both rects
   */
  function derivePosition(triggerRect: DOMRect, tooltipRect: DOMRect): ActualPosition {
    const tolerance = 1

    if (tooltipRect.bottom <= triggerRect.top + tolerance) {
      return 'top'
    }
    if (tooltipRect.top >= triggerRect.bottom - tolerance) {
      return 'bottom'
    }
    if (tooltipRect.right <= triggerRect.left + tolerance) {
      return 'left'
    }
    return 'right'
  }

  /**
   * Calculates the arrow offset so it keeps pointing at the trigger centre
   */
  function calculateArrowOffset(
    placement: ActualPosition,
    triggerRect: DOMRect,
    tooltipRect: DOMRect,
  ): Record<string, string> {
    const halfArrowSize = ARROW_SIZE / 2

    if (placement === 'top' || placement === 'bottom') {
      const triggerCenterX = triggerRect.left + (triggerRect.width / 2)
      const maxArrowPos = Math.max(ARROW_EDGE_PADDING, tooltipRect.width - ARROW_EDGE_PADDING)
      const arrowLeft = Math.max(
        ARROW_EDGE_PADDING,
        Math.min(maxArrowPos, triggerCenterX - tooltipRect.left),
      )

      return { left: `${arrowLeft}px`, marginLeft: `-${halfArrowSize}px` }
    }

    const triggerCenterY = triggerRect.top + (triggerRect.height / 2)
    const maxArrowPos = Math.max(ARROW_EDGE_PADDING, tooltipRect.height - ARROW_EDGE_PADDING)
    const arrowTop = Math.max(
      ARROW_EDGE_PADDING,
      Math.min(maxArrowPos, triggerCenterY - tooltipRect.top),
    )

    return { top: `${arrowTop}px`, marginTop: `-${halfArrowSize}px` }
  }

  /**
   * Reads back the browser-resolved placement to keep the position class and arrow in sync
   */
  function syncArrow(): void {
    if (!isClient || !enabled.value) {
      return
    }

    if (!triggerElement.value || !tooltipElement.value) {
      return
    }

    const triggerRect = triggerElement.value.getBoundingClientRect()
    const tooltipRect = tooltipElement.value.getBoundingClientRect()

    actualPosition.value = derivePosition(triggerRect, tooltipRect)

    arrowStyles.value = showArrow.value
      ? calculateArrowOffset(actualPosition.value, triggerRect, tooltipRect)
      : {}
  }

  return {
    anchorName,
    actualPosition,
    tooltipStyles,
    arrowStyles,
    syncArrow,
  }
}
