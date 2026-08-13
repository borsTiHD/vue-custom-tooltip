import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, effectScope, h, nextTick, ref } from 'vue'
import Tooltip from '../components/tooltip/Tooltip.vue'
import { useAnchorPosition } from '../composables/useAnchorPosition'
import { DEFAULT_TOOLTIP_PROPS } from '../composables/useTooltipProps'
import { resetTooltipGlobalConfig, setTooltipGlobalConfig, setTooltipGlobalPositioningStrategy } from '../config/globalConfig'
import { getTooltipGlobalConfig } from '../config/index'
import { VueCustomTooltip } from '../index'
import { resetAnchorSupportCache, supportsAnchorPositioning } from '../utils/anchorSupport'

function stubAnchorSupport(supported: boolean) {
  vi.spyOn(window.CSS, 'supports').mockReturnValue(supported)
  resetAnchorSupportCache()
}

function mountTooltip(props: Record<string, unknown> = {}) {
  return mount(Tooltip, {
    props: { content: 'Test', modelValue: false, ...props },
    slots: { default: () => h('button', 'Trigger') },
  })
}

async function showTooltip(props: Record<string, unknown> = {}) {
  const wrapper = mountTooltip(props)
  await wrapper.setProps({ modelValue: true })
  await nextTick()

  const tooltip = document.body.querySelector('.custom-tooltip') as HTMLElement
  expect(tooltip).not.toBeNull()

  return { wrapper, tooltip }
}

describe('positioning strategy', () => {
  beforeEach(() => {
    resetTooltipGlobalConfig()
    resetAnchorSupportCache()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    resetAnchorSupportCache()
  })

  it('defaults to the css strategy', () => {
    expect(DEFAULT_TOOLTIP_PROPS.positioningStrategy).toBe('css')
  })

  it('reports no anchor support when CSS.supports is falsy', () => {
    stubAnchorSupport(false)
    expect(supportsAnchorPositioning()).toBe(false)
  })

  it('reports anchor support and memoizes the result', () => {
    const spy = vi.spyOn(window.CSS, 'supports').mockReturnValue(true)
    resetAnchorSupportCache()

    expect(supportsAnchorPositioning()).toBe(true)
    expect(supportsAnchorPositioning()).toBe(true)
    expect(spy).toHaveBeenCalledTimes(2) // two feature queries, evaluated once
  })

  it('falls back to js positioning when the browser lacks support', async () => {
    stubAnchorSupport(false)

    const { wrapper, tooltip } = await showTooltip()
    expect(tooltip.style.position).toBe('absolute')

    wrapper.unmount()
  })

  it('applies anchor styles when the browser supports anchor positioning', async () => {
    stubAnchorSupport(true)

    const { wrapper, tooltip } = await showTooltip()
    expect(tooltip.style.position).toBe('fixed')

    wrapper.unmount()
  })

  it('honours an explicit js prop even when anchors are supported', async () => {
    stubAnchorSupport(true)

    const { wrapper, tooltip } = await showTooltip({ positioningStrategy: 'js' })
    expect(tooltip.style.position).toBe('absolute')

    wrapper.unmount()
  })

  it('lets the global config override the built-in default', async () => {
    stubAnchorSupport(true)
    setTooltipGlobalConfig({ positioningStrategy: 'js' })

    const { wrapper, tooltip } = await showTooltip()
    expect(tooltip.style.position).toBe('absolute')

    wrapper.unmount()
  })

  it('applies the plugin-level option to the global config', () => {
    const app = { component: vi.fn(), directive: vi.fn() } as any
    VueCustomTooltip.install?.(app, { positioningStrategy: 'js' })

    expect(getTooltipGlobalConfig().positioningStrategy).toBe('js')
  })

  it('lets globalConfig win over the plugin-level shorthand', () => {
    const app = { component: vi.fn(), directive: vi.fn() } as any
    VueCustomTooltip.install?.(app, {
      positioningStrategy: 'js',
      globalConfig: { positioningStrategy: 'css' },
    })

    expect(getTooltipGlobalConfig().positioningStrategy).toBe('css')
  })

  it('setTooltipGlobalPositioningStrategy keeps the rest of the config intact', () => {
    setTooltipGlobalConfig({ position: 'top', showDelay: 42 })
    setTooltipGlobalPositioningStrategy('js')

    expect(getTooltipGlobalConfig().positioningStrategy).toBe('js')
    expect(getTooltipGlobalConfig().position).toBe('top')
    expect(getTooltipGlobalConfig().showDelay).toBe(42)
  })
})

describe('directive positioning modifiers', () => {
  beforeEach(() => {
    resetTooltipGlobalConfig()
    resetAnchorSupportCache()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    resetAnchorSupportCache()
  })

  async function mountWithModifiers(modifiers: string) {
    const wrapper = mount({
      template: `<button v-tooltip${modifiers}="'Directive tooltip'">Trigger</button>`,
    }, {
      global: { plugins: [VueCustomTooltip] },
      attachTo: document.body,
    })

    await wrapper.vm.$nextTick()
    return wrapper
  }

  it('anchors the trigger for the .css modifier', async () => {
    stubAnchorSupport(true)

    const wrapper = await mountWithModifiers('.css')
    const setProperty = wrapper.element.style.getPropertyValue('anchor-name')

    expect(setProperty === '' ? anchorNameFallback(wrapper.element) : setProperty).toMatch(/^--vct-a\d+$/)

    wrapper.unmount()
  })

  it('does not anchor the trigger for the .js modifier', async () => {
    stubAnchorSupport(true)

    const wrapper = await mountWithModifiers('.js')

    expect(anchorNameFallback(wrapper.element)).toBe('')

    wrapper.unmount()
  })
})

describe('useAnchorPosition', () => {
  it('builds anchor styles and toggles anchor-name on the trigger', () => {
    const trigger = document.createElement('button')
    const setProperty = vi.spyOn(trigger.style, 'setProperty')
    const removeProperty = vi.spyOn(trigger.style, 'removeProperty')

    const scope = effectScope()
    const enabled = ref(true)

    const result = scope.run(() => useAnchorPosition(
      computed(() => trigger),
      computed(() => document.createElement('div')),
      computed(() => 'auto' as const),
      computed(() => 8),
      computed(() => '250px'),
      computed(() => true),
      computed(() => enabled.value),
    ))!

    expect(setProperty).toHaveBeenCalledWith('anchor-name', result.anchorName)
    expect(result.tooltipStyles.value).toMatchObject({
      position: 'fixed',
      positionAnchor: result.anchorName,
      positionArea: 'bottom',
      positionVisibility: 'anchor-visible',
      positionTryFallbacks: '--vct-top, --vct-right, --vct-left',
      margin: '8px',
      maxWidth: '250px',
    })

    scope.stop()
    expect(removeProperty).toHaveBeenCalledWith('anchor-name')
  })

  it('omits try-fallbacks for an explicit position', () => {
    const scope = effectScope()

    const result = scope.run(() => useAnchorPosition(
      computed(() => document.createElement('button')),
      computed(() => document.createElement('div')),
      computed(() => 'left' as const),
      computed(() => 4),
      computed(() => '100px'),
      computed(() => false),
      computed(() => true),
    ))!

    expect(result.tooltipStyles.value.positionArea).toBe('left')
    expect(result.tooltipStyles.value.positionTryFallbacks).toBeUndefined()

    scope.stop()
  })

  it('derives the placement and arrow offset from the rendered rects', () => {
    const trigger = document.createElement('button')
    const tooltip = document.createElement('div')
    trigger.getBoundingClientRect = () => rect(100, 200, 50, 20)
    // Browser flipped the tooltip above the trigger
    tooltip.getBoundingClientRect = () => rect(60, 150, 130, 40)

    const scope = effectScope()
    const result = scope.run(() => useAnchorPosition(
      computed(() => trigger),
      computed(() => tooltip),
      computed(() => 'auto' as const),
      computed(() => 8),
      computed(() => '250px'),
      computed(() => true),
      computed(() => true),
    ))!

    result.syncArrow()

    expect(result.actualPosition.value).toBe('top')
    // trigger centre (125) minus tooltip left edge (60)
    expect(result.arrowStyles.value.left).toBe('65px')
    expect(result.arrowStyles.value.marginLeft).toBe('-4px')

    scope.stop()
  })

  it('clamps the arrow inside the tooltip bounds', () => {
    const trigger = document.createElement('button')
    const tooltip = document.createElement('div')
    trigger.getBoundingClientRect = () => rect(0, 200, 20, 20)
    tooltip.getBoundingClientRect = () => rect(100, 230, 200, 40)

    const scope = effectScope()
    const result = scope.run(() => useAnchorPosition(
      computed(() => trigger),
      computed(() => tooltip),
      computed(() => 'auto' as const),
      computed(() => 8),
      computed(() => '250px'),
      computed(() => true),
      computed(() => true),
    ))!

    result.syncArrow()

    expect(result.actualPosition.value).toBe('bottom')
    expect(result.arrowStyles.value.left).toBe('12px')

    scope.stop()
  })

  it('skips arrow styles when the arrow is hidden', () => {
    const trigger = document.createElement('button')
    const tooltip = document.createElement('div')
    trigger.getBoundingClientRect = () => rect(100, 200, 50, 20)
    tooltip.getBoundingClientRect = () => rect(60, 230, 130, 40)

    const scope = effectScope()
    const result = scope.run(() => useAnchorPosition(
      computed(() => trigger),
      computed(() => tooltip),
      computed(() => 'bottom' as const),
      computed(() => 8),
      computed(() => '250px'),
      computed(() => false),
      computed(() => true),
    ))!

    result.syncArrow()

    expect(result.actualPosition.value).toBe('bottom')
    expect(result.arrowStyles.value).toEqual({})

    scope.stop()
  })
})

function rect(left: number, top: number, width: number, height: number): DOMRect {
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({}),
  } as DOMRect
}

// jsdom's CSSStyleDeclaration drops unknown properties, so fall back to the raw attribute.
function anchorNameFallback(element: Element): string {
  const inline = element.getAttribute('style') ?? ''
  return inline.match(/anchor-name:\s*([^;]+)/)?.[1]?.trim() ?? ''
}
