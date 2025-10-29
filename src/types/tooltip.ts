import type {
  TooltipPositionModifier,
  TooltipTriggerModifier,
} from '@/types/tooltip-modifiers'

/**
 * Theme options for the tooltip component.
 * - 'default': Use default theme styles.
 * - 'primevue': Use PrimeVue theme styles.
 * - 'vuetify': Use Vuetify theme styles.
 */
export type TooltipTheme = 'default' | 'primevue' | 'vuetify'

/**
 * Tooltip component prop types
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
  position?: TooltipPositionModifier

  /**
   * Trigger behavior for the tooltip
   * - 'hover': Show/hide on mouse enter/leave
   * - 'focus': Show/hide on focus/blur (keyboard navigation)
   * - 'both': Show/hide on both hover and focus
   * - 'click': Toggle on click
   * @default 'both'
   */
  trigger?: TooltipTriggerModifier

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

  /**
   * External trigger element reference
   * Used by the directive to pass the original element without moving it in the DOM
   * @internal
   * @default undefined
   */
  externalTrigger?: HTMLElement
}

/**
 * Tooltip component slots
 */
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
