import type { TooltipProps } from '@/components/tooltip/Tooltip.vue'

import { reactive } from 'vue'

/**
 * Global reactive configuration for tooltips
 */
const globalConfig = reactive<Partial<TooltipProps>>({})

/**
 * Set global configuration for all tooltips
 * This will be used as default values that can be overridden by individual tooltip props
 */
export function setTooltipGlobalConfig(config: Partial<TooltipProps>): void {
  // Clear existing config
  Object.keys(globalConfig).forEach((key) => {
    delete globalConfig[key as keyof TooltipProps]
  })
  // Set new config
  Object.assign(globalConfig, config)
}

/**
 * Get the current global configuration
 * Returns a copy to prevent external mutation
 */
export function getTooltipGlobalConfig(): Partial<TooltipProps> {
  return { ...globalConfig }
}

/**
 * Get the reactive global configuration reference
 * Used internally by the Tooltip component and directive
 * @internal
 */
export function getReactiveGlobalConfig(): Partial<TooltipProps> {
  return globalConfig
}

/**
 * Reset global configuration to empty
 */
export function resetTooltipGlobalConfig(): void {
  Object.keys(globalConfig).forEach((key) => {
    delete globalConfig[key as keyof TooltipProps]
  })
}
