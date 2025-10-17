/// <reference types="vite/client" />

// Type augmentation for globally registered components (for local development)
import type Tooltip from './src/components/tooltip/Tooltip.vue'

declare module 'vue' {
  export interface GlobalComponents {
    Tooltip: typeof Tooltip
  }
}
