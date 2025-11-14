import type { App, Plugin } from 'vue'

import type { TooltipProps, TooltipTheme } from './types/tooltip'
import Tooltip from './components/tooltip/Tooltip.vue'
import { setTooltipGlobalConfig, setTooltipGlobalTheme } from './config/index'
import { TooltipControl, vTooltip } from './directives/tooltip'

// Export components and directives
export { Tooltip, TooltipControl, vTooltip }

// Export composables for advanced usage
export * from './composables'

// Export configuration functions
export { getTooltipGlobalConfig, getTooltipGlobalTheme, resetTooltipGlobalConfig, setTooltipGlobalConfig, setTooltipGlobalTheme } from './config/index'

export type { TooltipExposed, TooltipProps, TooltipSlots, TooltipTheme } from './types/tooltip'
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
  /**
   * Theme to apply to all tooltips
   * Available themes: 'classic', 'primevue', 'vuetify'
   * If not specified, the default theme will be used
   */
  theme?: TooltipTheme

  /**
   * Custom component name for the tooltip component (default: 'Tooltip')
   */
  componentName?: string

  /**
   * Custom directive name for the tooltip directive (default: 'tooltip')
   */
  directiveName?: string
}

/**
 * Injects theme styles into the document head
 */
async function injectThemeStyles(theme: TooltipTheme): Promise<void> {
  // Default theme uses the component's built-in styles, no CSS injection needed
  if (theme === 'default') {
    // Remove any previously injected theme styles to revert to default
    const oldStyles = document.querySelectorAll('style[data-vct-theme]')
    oldStyles.forEach(style => style.remove())
    return
  }

  // Check if theme styles are already injected
  const existingStyle = document.querySelector(`style[data-vct-theme="${theme}"]`)
  if (existingStyle) {
    return
  }

  // Remove any previously injected theme styles
  const oldStyles = document.querySelectorAll('style[data-vct-theme]')
  oldStyles.forEach(style => style.remove())

  try {
    // Import the theme CSS dynamically
    if (theme === 'classic') {
      await import('./styles/themes/classic.css')
    }
    else if (theme === 'primevue') {
      await import('./styles/themes/primevue.css')
    }
    else if (theme === 'vuetify') {
      await import('./styles/themes/vuetify.css')
    }
    else {
      console.warn(`Unknown theme "${theme}"`)
      return
    }

    // Mark that this theme has been loaded
    const marker = document.createElement('style')
    marker.setAttribute('data-vct-theme', theme)
    marker.textContent = `/* Vue Custom Tooltip Theme: ${theme} */`
    document.head.appendChild(marker)
  }
  catch (error) {
    console.error(`Failed to load theme "${theme}":`, error)
  }
}

// Export theme CSS injector for runtime theme switching
export { injectThemeStyles }

// Vue plugin for easy installation
export const VueCustomTooltip: Plugin = {
  install(app: App, options?: VueCustomTooltipOptions) {
    const componentName = options?.componentName || 'Tooltip'
    const directiveName = options?.directiveName || 'tooltip'
    app.component(componentName, Tooltip)
    app.directive(directiveName, vTooltip)

    // Apply global configuration if provided
    if (options?.globalConfig) {
      setTooltipGlobalConfig(options.globalConfig)
    }

    // Apply theme if provided
    if (options?.theme) {
      setTooltipGlobalTheme(options.theme)
      // Inject theme styles
      if (typeof document !== 'undefined') {
        injectThemeStyles(options.theme)
      }
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
