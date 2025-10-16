import type { ComputedRef } from 'vue'

import type { TooltipProps } from '../types/tooltip'
import { computed, getCurrentInstance } from 'vue'
import { getReactiveGlobalConfig } from '../config/globalConfig'

/**
 * Default values for tooltip props
 */
export const DEFAULT_TOOLTIP_PROPS: Readonly<Required<Omit<TooltipProps, 'content'>>> = {
  position: 'auto',
  trigger: 'both',
  showDelay: 100,
  hideDelay: 100,
  disabled: false,
  maxWidth: '250px',
  tooltipClass: '',
  showArrow: true,
  offset: 8,
  dark: 'auto',
}

/**
 * Converts camelCase to kebab-case
 */
function toKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
}

/**
 * Composable for managing tooltip props with priority:
 * Component Prop > Global Config > Default Value
 *
 * @param props - The component props
 * @returns Object containing effective prop values
 */
export function useTooltipProps(props: TooltipProps) {
  // Get reactive global configuration (single source of truth)
  const globalConfig = getReactiveGlobalConfig()

  // Track which props were explicitly passed by the user
  const instance = getCurrentInstance()
  const propsPassedByUser = computed(() => {
    const vnodeProps = instance?.vnode.props || {}
    return new Set(Object.keys(vnodeProps))
  })

  /**
   * Checks if a prop was explicitly passed to the component
   */
  function wasPropPassed(propName: string): boolean {
    const kebabName = toKebabCase(propName)
    return propsPassedByUser.value.has(propName) || propsPassedByUser.value.has(kebabName)
  }

  /**
   * Creates a computed property that resolves the effective value of a prop
   * by respecting the priority: Component Prop > Global Config > Default Value.
   */
  function getEffectiveProp<T extends keyof TooltipProps>(
    propName: T,
    defaultValue: NonNullable<TooltipProps[T]>,
  ): ComputedRef<NonNullable<TooltipProps[T]>> {
    return computed(() => {
      // 1. Check if the prop was explicitly passed on the component
      if (wasPropPassed(propName)) {
        const propValue = props[propName]
        // Use the prop value if it's not null/undefined. This handles explicit 'false' or '0'.
        if (propValue !== undefined && propValue !== null)
          return propValue as NonNullable<TooltipProps[T]>
      }

      // 2. If not passed, check for a value in the global configuration
      const globalValue = globalConfig[propName]
      if (globalValue !== undefined && globalValue !== null)
        return globalValue as NonNullable<TooltipProps[T]>

      // 3. Fallback to the built-in default value
      return defaultValue
    })
  }

  return {
    effectivePosition: getEffectiveProp('position', DEFAULT_TOOLTIP_PROPS.position),
    effectiveTrigger: getEffectiveProp('trigger', DEFAULT_TOOLTIP_PROPS.trigger),
    effectiveShowDelay: getEffectiveProp('showDelay', DEFAULT_TOOLTIP_PROPS.showDelay),
    effectiveHideDelay: getEffectiveProp('hideDelay', DEFAULT_TOOLTIP_PROPS.hideDelay),
    effectiveDisabled: getEffectiveProp('disabled', DEFAULT_TOOLTIP_PROPS.disabled),
    effectiveMaxWidth: getEffectiveProp('maxWidth', DEFAULT_TOOLTIP_PROPS.maxWidth),
    effectiveTooltipClass: getEffectiveProp('tooltipClass', DEFAULT_TOOLTIP_PROPS.tooltipClass),
    effectiveShowArrow: getEffectiveProp('showArrow', DEFAULT_TOOLTIP_PROPS.showArrow),
    effectiveOffset: getEffectiveProp('offset', DEFAULT_TOOLTIP_PROPS.offset),
    effectiveDark: getEffectiveProp('dark', DEFAULT_TOOLTIP_PROPS.dark),
  }
}
