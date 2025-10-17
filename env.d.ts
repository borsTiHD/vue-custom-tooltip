/// <reference types="vite/client" />

// Type augmentation for globally registered components and directives (for local development)
import type Tooltip from './src/components/tooltip/Tooltip.vue'
import type { vTooltip } from './src/directives/tooltip'

declare module 'vue' {
  export interface GlobalComponents {
    Tooltip: typeof Tooltip
  }

  export interface GlobalDirectives {
    tooltip: typeof vTooltip
  }
}
