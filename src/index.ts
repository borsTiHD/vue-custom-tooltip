import type { App, Plugin } from 'vue'
import Tooltip from './components/tooltip/Tooltip.vue'
import { tooltipDirective, vTooltip } from './directives/tooltip'

// Export components and directives
export { Tooltip, tooltipDirective, vTooltip }

// Export types
export type { TooltipProps, TooltipSlots } from './components/tooltip/Tooltip.vue'

// Vue plugin for easy installation
export const VueCustomTooltip: Plugin = {
  install(app: App) {
    app.component('Tooltip', Tooltip)
    app.directive('tooltip', tooltipDirective)
  },
}

// Default export
export default VueCustomTooltip
