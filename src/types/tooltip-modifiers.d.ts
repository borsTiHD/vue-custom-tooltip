/**
 * Type definitions for v-tooltip directive modifiers
 *
 * This file provides TypeScript documentation for available modifiers.
 * Unfortunately, Vue 3 and TypeScript do not support autocomplete for
 * directive modifiers in templates. This is a known limitation.
 *
 * However, you can reference this file for available modifiers:
 */

/**
 * Position modifiers - Control where the tooltip appears relative to the trigger element
 */
export type TooltipPositionModifier = 'top' | 'bottom' | 'left' | 'right' | 'auto'

/**
 * Trigger modifiers - Control when the tooltip appears
 */
export type TooltipTriggerModifier = 'hover' | 'focus' | 'both' | 'click'

/**
 * Timing modifiers - Control show/hide delays
 */
export type TooltipTimingModifier = 'fast' | 'slow'

/**
 * Theme modifiers - Control tooltip theme
 */
export type TooltipThemeModifier = 'dark' | 'light'

/**
 * State modifiers - Control tooltip state
 */
export type TooltipStateModifier = 'disabled'

/**
 * Tooltip directive modifiers interface
 * Represents all possible modifiers that can be used with v-tooltip
 */
export interface TooltipDirectiveModifiers {
  /** Position: Show tooltip on top of trigger */
  top?: boolean
  /** Position: Show tooltip below trigger */
  bottom?: boolean
  /** Position: Show tooltip to the left of trigger */
  left?: boolean
  /** Position: Show tooltip to the right of trigger */
  right?: boolean
  /** Position: Automatically determine best position */
  auto?: boolean

  /** Trigger: Show on hover only */
  hover?: boolean
  /** Trigger: Show on focus only */
  focus?: boolean
  /** Trigger: Show on both hover and focus */
  both?: boolean
  /** Trigger: Toggle on click */
  click?: boolean

  /** Timing: Fast show/hide (10ms show, 50ms hide) */
  fast?: boolean
  /** Timing: Slow show/hide (1000ms show, 500ms hide) */
  slow?: boolean

  /** State: Disable tooltip */
  disabled?: boolean

  /** Theme: Force dark theme */
  dark?: boolean
  /** Theme: Force light theme */
  light?: boolean
}

/**
 * Usage examples:
 *
 * @example
 * // Simple tooltip
 * <button v-tooltip="'Tooltip text'">Button</button>
 *
 * @example
 * // With position modifier
 * <button v-tooltip.top="'Top tooltip'">Button</button>
 *
 * @example
 * // With multiple modifiers
 * <button v-tooltip.bottom.fast="'Fast bottom tooltip'">Button</button>
 *
 * @example
 * // With click trigger
 * <button v-tooltip.click="'Click to toggle'">Button</button>
 *
 * @example
 * // Object syntax for advanced configuration
 * <button v-tooltip="{ content: 'Custom', position: 'top', showDelay: 500 }">
 *   Button
 * </button>
 */
