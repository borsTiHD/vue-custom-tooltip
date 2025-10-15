import type { Plugin } from 'vue'
import { vTooltip } from './tooltip'

const directives: Plugin = {
  install(app) {
    app.directive('tooltip', vTooltip)
  },
}

export default directives
