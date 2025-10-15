import type { Plugin } from 'vue'
import { tooltipDirective } from './tooltip'

const directives: Plugin = {
  install(app) {
    app.directive('tooltip', tooltipDirective)
  },
}

export default directives
