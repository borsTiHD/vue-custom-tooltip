import type { App, Directive } from 'vue'
import type { TooltipProps } from '@/components/tooltip/Tooltip.vue'
import type { TooltipDirectiveModifiers } from '@/types/tooltip-modifiers'

import { createApp, h } from 'vue'
import Tooltip from '@/components/tooltip/Tooltip.vue'
import { getReactiveGlobalConfig } from '@/config/globalConfig'

export type {
  TooltipDirectiveModifiers,
  TooltipPositionModifier,
  TooltipStateModifier,
  TooltipThemeModifier,
  TooltipTimingModifier,
  TooltipTriggerModifier,
} from '@/types/tooltip-modifiers'

interface TooltipDirectiveBinding {
  value?: string | TooltipProps
  modifiers?: TooltipDirectiveModifiers
}

interface TooltipDirectiveInstance {
  app: App
  wrapper: HTMLElement
  originalElement: HTMLElement
  cleanup: () => void
}

// Store tooltip instances
const TOOLTIP_INSTANCES = new WeakMap<HTMLElement, TooltipDirectiveInstance>()

function getTooltipProps(binding: TooltipDirectiveBinding): TooltipProps {
  const {
    value,
    modifiers = {} as TooltipDirectiveModifiers,
  } = binding

  // Merge with global configuration
  let props: TooltipProps = { ...getReactiveGlobalConfig() }

  // Parse value (overrides global config)
  if (typeof value === 'string') {
    props.content = value
  }
  else if (typeof value === 'object' && value) {
    props = { ...props, ...value }
  }

  // Parse modifiers for position
  if (modifiers.top)
    props.position = 'top'
  if (modifiers.bottom)
    props.position = 'bottom'
  if (modifiers.left)
    props.position = 'left'
  if (modifiers.right)
    props.position = 'right'
  if (modifiers.auto)
    props.position = 'auto'

  // Parse modifiers for trigger
  if (modifiers.hover)
    props.trigger = 'hover'
  if (modifiers.focus)
    props.trigger = 'focus'
  if (modifiers.both)
    props.trigger = 'both'
  if (modifiers.click)
    props.trigger = 'click'

  // Parse modifiers for timing
  if (modifiers.fast) {
    props.showDelay = 10
    props.hideDelay = 50
  }
  if (modifiers.slow) {
    props.showDelay = 1000
    props.hideDelay = 500
  }

  // Parse modifiers for state
  if (modifiers.disabled)
    props.disabled = true

  // Parse modifiers for dark mode
  if (modifiers.dark)
    props.dark = true
  if (modifiers.light)
    props.dark = false

  return props
}

function createTooltipInstance(
  element: HTMLElement,
  binding: TooltipDirectiveBinding,
): TooltipDirectiveInstance {
  const tooltipProps = getTooltipProps(binding)

  // Create container for tooltip (element stays in place - non-invasive)
  const tooltipContainer = document.createElement('div')
  tooltipContainer.style.display = 'contents' // Makes the container invisible in layout
  tooltipContainer.setAttribute('data-tooltip-container', '') // For debugging

  // Store reference to the original element
  const originalElement = element

  // Insert container AFTER the element (element stays in original position)
  const parent = element.parentNode
  if (parent) {
    parent.insertBefore(tooltipContainer, element.nextSibling)
  }

  // Create Vue app instance for the tooltip with external trigger
  const tooltipApp = createApp({
    render() {
      // Pass the original element as externalTrigger prop
      return h(Tooltip, {
        ...tooltipProps,
        externalTrigger: originalElement,
      })
    },
  })

  // Mount the tooltip app to the container (not replacing the element)
  tooltipApp.mount(tooltipContainer)

  const cleanup = () => {
    try {
      tooltipApp.unmount()
    }
    catch (error) {
      console.warn('Error unmounting tooltip app:', error)
    }

    // Remove the tooltip container (original element stays untouched)
    if (tooltipContainer.parentNode) {
      tooltipContainer.parentNode.removeChild(tooltipContainer)
    }
  }

  return {
    app: tooltipApp,
    wrapper: tooltipContainer,
    originalElement,
    cleanup,
  }
}

export const vTooltip: Directive<HTMLElement, string | TooltipProps> = {
  mounted(element: HTMLElement, binding) {
    if (!binding.value)
      return

    const instance = createTooltipInstance(element, binding)
    TOOLTIP_INSTANCES.set(element, instance)
  },

  updated(element: HTMLElement, binding) {
    const instance = TOOLTIP_INSTANCES.get(element)
    if (instance) {
      instance.cleanup()
      TOOLTIP_INSTANCES.delete(element)
    }

    if (!binding.value)
      return

    const newInstance = createTooltipInstance(element, binding)
    TOOLTIP_INSTANCES.set(element, newInstance)
  },

  unmounted(element: HTMLElement) {
    const instance = TOOLTIP_INSTANCES.get(element)
    if (instance) {
      instance.cleanup()
      TOOLTIP_INSTANCES.delete(element)
    }
  },
}
