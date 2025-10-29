import type { TooltipProps, TooltipTheme } from '@/types/tooltip'

import { reactive, ref } from 'vue'

/**
 * Global reactive configuration for tooltips
 */
const globalConfig = reactive<Partial<TooltipProps>>({})

/**
 * Global theme configuration (stored separately from props)
 */
const globalTheme = ref<TooltipTheme | undefined>(undefined)

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
 * Set the global theme for all tooltips
 */
export function setTooltipGlobalTheme(theme: TooltipTheme | undefined): void {
  globalTheme.value = theme
}

/**
 * Get the current global theme
 */
export function getTooltipGlobalTheme(): TooltipTheme | undefined {
  return globalTheme.value
}

/**
 * Get the current global theme (reactive reference)
 */
export function getTooltipGlobalThemeRef() {
  return globalTheme
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
  globalTheme.value = undefined
}
