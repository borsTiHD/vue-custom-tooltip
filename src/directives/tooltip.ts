import type { App, Directive } from 'vue'
import type { TooltipProps } from '@/components/tooltip/Tooltip.vue'
import type { TooltipDirectiveModifiers } from '@/types/tooltip-modifiers'

import { createApp, h, reactive } from 'vue'
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

interface TooltipInstance {
  id: string
  element: HTMLElement
  props: TooltipProps
}

// Shared state for all tooltip instances
const tooltipStore = reactive({
  tooltips: new Map<string, TooltipInstance>(),
})

// Single shared Vue app instance
let sharedApp: App | null = null
let appContainer: HTMLElement | null = null
let instanceCounter = 0

// Generate unique ID for each tooltip
function generateTooltipInstanceId(): string {
  return `tooltip-directive-${++instanceCounter}`
}

// WeakMap to track element to tooltip ID mapping
const elementTooltipMap = new WeakMap<HTMLElement, string>()

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

/**
 * Initialize the shared Vue app for all directive tooltips
 * This is called lazily on first directive mount
 */
function initializeSharedApp() {
  if (sharedApp)
    return

  // Create a container for all directive tooltips
  appContainer = document.createElement('div')
  appContainer.setAttribute('data-tooltip-directive-container', '')
  appContainer.style.display = 'contents' // Invisible in layout
  document.body.appendChild(appContainer)

  // Create single Vue app that renders all tooltips
  sharedApp = createApp({
    setup() {
      return { tooltips: tooltipStore.tooltips }
    },
    render() {
      // Render all active tooltips
      const tooltipComponents = Array.from(this.tooltips.values() as IterableIterator<TooltipInstance>).map((instance) => {
        return h(Tooltip, {
          key: instance.id,
          ...instance.props,
          externalTrigger: instance.element,
        })
      })

      return tooltipComponents
    },
  })

  sharedApp.mount(appContainer)
}

/**
 * Add a tooltip instance to the shared app
 */
function addTooltipInstance(element: HTMLElement, binding: TooltipDirectiveBinding): string {
  // Initialize shared app if needed
  initializeSharedApp()

  const id = generateTooltipInstanceId()
  const props = getTooltipProps(binding)

  // Add to reactive store (triggers re-render)
  tooltipStore.tooltips.set(id, {
    id,
    element,
    props,
  })

  // Track mapping
  elementTooltipMap.set(element, id)

  return id
}

/**
 * Update a tooltip instance in the shared app
 */
function updateTooltipInstance(element: HTMLElement, binding: TooltipDirectiveBinding) {
  const id = elementTooltipMap.get(element)
  if (!id)
    return

  const props = getTooltipProps(binding)

  // Update in reactive store (triggers re-render)
  const existing = tooltipStore.tooltips.get(id)
  if (existing) {
    tooltipStore.tooltips.set(id, {
      ...existing,
      props,
    })
  }
}

/**
 * Remove a tooltip instance from the shared app
 */
function removeTooltipInstance(element: HTMLElement) {
  const id = elementTooltipMap.get(element)
  if (!id)
    return

  // Remove from reactive store (triggers re-render)
  tooltipStore.tooltips.delete(id)
  elementTooltipMap.delete(element)

  // Clean up shared app if no tooltips remain
  if (tooltipStore.tooltips.size === 0 && sharedApp && appContainer) {
    sharedApp.unmount()
    if (appContainer.parentNode) {
      appContainer.parentNode.removeChild(appContainer)
    }
    sharedApp = null
    appContainer = null
  }
}

export const vTooltip: Directive<HTMLElement, string | TooltipProps> = {
  mounted(element: HTMLElement, binding) {
    if (!binding.value)
      return

    addTooltipInstance(element, binding)
  },

  updated(element: HTMLElement, binding) {
    if (!binding.value) {
      removeTooltipInstance(element)
      return
    }

    updateTooltipInstance(element, binding)
  },

  unmounted(element: HTMLElement) {
    removeTooltipInstance(element)
  },
}
