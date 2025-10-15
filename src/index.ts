import type { App, Plugin } from 'vue'
import Tooltip from './components/tooltip/Tooltip.vue'
import { vTooltip } from './directives/tooltip'

// Export components and directives
export { Tooltip, vTooltip }

// Export types
export type { TooltipProps, TooltipSlots } from './components/tooltip/Tooltip.vue'

// Vue plugin for easy installation
export const VueCustomTooltip: Plugin = {
  install(app: App) {
    app.component('Tooltip', Tooltip)
    app.directive('tooltip', vTooltip)
  },
}

// Default export
export default VueCustomTooltip
