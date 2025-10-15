import type { App, Directive } from 'vue'
import type { TooltipProps } from '@/components/tooltip/Tooltip.vue'

import { createApp, h } from 'vue'
import Tooltip from '@/components/tooltip/Tooltip.vue'

interface TooltipDirectiveBinding {
  value?: string | TooltipProps
  modifiers?: {
    top?: boolean
    bottom?: boolean
    left?: boolean
    right?: boolean
    auto?: boolean
    hover?: boolean
    focus?: boolean
    both?: boolean
    click?: boolean
    fast?: boolean
    slow?: boolean
    disabled?: boolean
  }
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
    modifiers = {},
  } = binding

  let props: TooltipProps = {
    position: 'auto',
    trigger: 'hover',
    showDelay: 300,
    hideDelay: 200,
    disabled: false,
    maxWidth: '250px',
    offset: 8,
    showArrow: true,
  }

  // Parse value
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

  return props
}

function createTooltipInstance(
  element: HTMLElement,
  binding: TooltipDirectiveBinding,
): TooltipDirectiveInstance {
  const tooltipProps = getTooltipProps(binding)

  // Create wrapper div that will replace the original element
  const wrapper = document.createElement('div')
  wrapper.style.display = 'contents' // This makes the wrapper invisible in layout

  // Clone original element and preserve all attributes and event listeners
  const originalElement = element.cloneNode(true) as HTMLElement

  // Replace original element with wrapper in DOM
  const parent = element.parentNode
  if (parent) {
    parent.insertBefore(wrapper, element)
    parent.removeChild(element)
  }

  // Create Vue app instance for the tooltip
  const tooltipApp = createApp({
    mounted() {
      // After mounting, move the original element into the tooltip's trigger slot
      const triggerElement = this.$el.querySelector('.tooltip-trigger')
      if (triggerElement && originalElement) {
        // Clear the placeholder and add the original element
        triggerElement.innerHTML = ''
        triggerElement.appendChild(originalElement)
      }
    },
    render() {
      return h(Tooltip, tooltipProps, {
        default: () => h('div'), // Placeholder, will be replaced in mounted
      })
    },
  })

  // Mount the tooltip app to the wrapper
  tooltipApp.mount(wrapper)

  const cleanup = () => {
    try {
      tooltipApp.unmount()
    }
    catch (error) {
      console.warn('Error unmounting tooltip app:', error)
    }

    if (wrapper.parentNode && originalElement) {
      // Restore original element to its original position
      wrapper.parentNode.insertBefore(originalElement, wrapper)
      wrapper.parentNode.removeChild(wrapper)
    }
  }

  return {
    app: tooltipApp,
    wrapper,
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
