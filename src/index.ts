import type { App, Plugin } from 'vue'

import type { TooltipProps } from './types/tooltip'
import Tooltip from './components/tooltip/Tooltip.vue'
import { setTooltipGlobalConfig } from './config/index'
import { vTooltip } from './directives/tooltip'

// Export components and directives
export { Tooltip, vTooltip }

// Export composables for advanced usage
export * from './composables'

// Export configuration functions
export { getTooltipGlobalConfig, resetTooltipGlobalConfig, setTooltipGlobalConfig } from './config/index'

export type { TooltipProps, TooltipSlots } from './types/tooltip'
// Export types
export type {
  TooltipDirectiveModifiers,
  TooltipPositionModifier,
  TooltipStateModifier,
  TooltipThemeModifier,
  TooltipTimingModifier,
  TooltipTriggerModifier,
} from './types/tooltip-modifiers'

/**
 * Options for the VueCustomTooltip plugin
 */
export interface VueCustomTooltipOptions {
  /**
   * Global configuration for all tooltips
   * These values will be used as defaults and can be overridden by individual tooltip props
   */
  globalConfig?: Partial<TooltipProps>
}

// Vue plugin for easy installation
export const VueCustomTooltip: Plugin = {
  install(app: App, options?: VueCustomTooltipOptions) {
    app.component('Tooltip', Tooltip)
    app.directive('tooltip', vTooltip)

    // Apply global configuration if provided
    if (options?.globalConfig) {
      setTooltipGlobalConfig(options.globalConfig)
    }
  },
}

// Type augmentation for globally registered components and directives
declare module 'vue' {
  export interface GlobalComponents {
    Tooltip: typeof Tooltip
  }

  export interface GlobalDirectives {
    /**
     * Tooltip directive with support for modifiers
     *
     * **Available Modifiers:**
     *
     * Position: `.top`, `.bottom`, `.left`, `.right`, `.auto`
     *
     * Trigger: `.hover`, `.focus`, `.both`, `.click`
     *
     * Timing: `.fast`, `.slow`
     *
     * State: `.disabled`
     *
     * Theme: `.dark`, `.light`
     *
     * @example
     * ```vue
     * <!-- Simple tooltip -->
     * <button v-tooltip="'Simple tooltip'">Hover me</button>
     *
     * <!-- With position modifier -->
     * <button v-tooltip.top="'Tooltip on top'">Top</button>
     *
     * <!-- Multiple modifiers -->
     * <button v-tooltip.click.slow="'Click to show (slow)'">Click</button>
     *
     * <!-- Object syntax for advanced configuration -->
     * <button v-tooltip="{ content: 'Custom', position: 'top', showDelay: 500 }">
     *   Custom config
     * </button>
     * ```
     *
     * @note TypeScript cannot autocomplete modifiers in templates due to Vue 3 limitations.
     * However, all modifiers are validated at runtime and will work as expected.
     */
    tooltip: typeof vTooltip
  }
}
