import { isClient } from './ssr'

let cachedSupport: boolean | undefined

/**
 * Detects whether the browser supports CSS anchor positioning.
 * Always false during SSR, so the JavaScript strategy is used until hydration.
 */
export function supportsAnchorPositioning(): boolean {
  if (!isClient) {
    return false
  }

  if (cachedSupport === undefined) {
    cachedSupport = typeof CSS !== 'undefined'
      && typeof CSS.supports === 'function'
      && CSS.supports('anchor-name: --a')
      && CSS.supports('position-try-fallbacks: flip-block')
  }

  return cachedSupport
}

/**
 * Clears the memoized feature detection result.
 * @internal
 */
export function resetAnchorSupportCache(): void {
  cachedSupport = undefined
}
