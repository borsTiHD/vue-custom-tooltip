import type { TooltipTheme } from '../types/tooltip'
import { isClient } from '../utils/ssr'

/**
 * Injects theme styles into the document head
 *
 * No-op during SSR - styles are injected once the client takes over.
 */
export async function injectThemeStyles(theme: TooltipTheme): Promise<void> {
  if (!isClient) {
    return
  }

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
      await import('../styles/themes/classic.css')
    }
    else if (theme === 'primevue') {
      await import('../styles/themes/primevue.css')
    }
    else if (theme === 'vuetify') {
      await import('../styles/themes/vuetify.css')
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
