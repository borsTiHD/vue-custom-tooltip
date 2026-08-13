/**
 * Whether the code is currently running in a browser environment.
 * Used to keep the library safe under SSR (Nuxt, vite-ssr, ...).
 */
export const isClient: boolean = typeof window !== 'undefined' && typeof document !== 'undefined'
