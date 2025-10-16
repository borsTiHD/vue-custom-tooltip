import type { App, Plugin } from 'vue'
import type { TooltipProps } from './components/tooltip/Tooltip.vue'
import Tooltip from './components/tooltip/Tooltip.vue'
import { setTooltipGlobalConfig } from './config/index'
import { vTooltip } from './directives/tooltip'

// Export components and directives
export { Tooltip, vTooltip }

// Export types
export type { TooltipProps, TooltipSlots } from './components/tooltip/Tooltip.vue'

// Export configuration functions
export { getTooltipGlobalConfig, resetTooltipGlobalConfig, setTooltipGlobalConfig } from './config/index'

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
