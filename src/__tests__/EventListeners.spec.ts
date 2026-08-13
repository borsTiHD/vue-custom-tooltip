import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import Tooltip from '../components/tooltip/Tooltip.vue'
import { resetTooltipGlobalConfig } from '../config/globalConfig'

const GLOBAL_EVENTS = ['resize', 'scroll', 'click']

function countGlobalListeners(spy: ReturnType<typeof vi.spyOn>) {
  return spy.mock.calls.filter((call: unknown[]) => GLOBAL_EVENTS.includes(call[0] as string)).length
}

function mountTooltip(props: Record<string, unknown> = {}) {
  return mount(Tooltip, {
    props: { content: 'Test', modelValue: false, ...props },
    slots: { default: () => h('button', 'Trigger') },
    attachTo: document.body,
  })
}

describe('global event listeners', () => {
  let addSpy: ReturnType<typeof vi.spyOn>
  let removeSpy: ReturnType<typeof vi.spyOn>
  let documentAddSpy: ReturnType<typeof vi.spyOn>
  let documentRemoveSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    resetTooltipGlobalConfig()
    addSpy = vi.spyOn(window, 'addEventListener')
    removeSpy = vi.spyOn(window, 'removeEventListener')
    documentAddSpy = vi.spyOn(document, 'addEventListener')
    documentRemoveSpy = vi.spyOn(document, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('registers no global listeners while the tooltip is hidden', async () => {
    const wrapper = mountTooltip()
    await nextTick()

    expect(countGlobalListeners(addSpy)).toBe(0)
    expect(countGlobalListeners(documentAddSpy)).toBe(0)

    wrapper.unmount()
  })

  it('attaches listeners on show and detaches them on hide', async () => {
    const wrapper = mountTooltip()
    await nextTick()

    await wrapper.setProps({ modelValue: true })
    await nextTick()

    expect(countGlobalListeners(addSpy)).toBe(2) // resize + scroll
    expect(countGlobalListeners(documentAddSpy)).toBe(1) // click outside

    await wrapper.setProps({ modelValue: false })
    await nextTick()

    expect(countGlobalListeners(removeSpy)).toBe(2)
    expect(countGlobalListeners(documentRemoveSpy)).toBe(1)

    wrapper.unmount()
  })

  it('does not scale listeners with the number of hidden tooltips', async () => {
    const wrappers = Array.from({ length: 5 }, () => mountTooltip())
    await nextTick()

    expect(countGlobalListeners(addSpy)).toBe(0)

    wrappers.forEach(wrapper => wrapper.unmount())
  })

  it('detaches listeners when unmounted while visible', async () => {
    const wrapper = mountTooltip()
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    expect(countGlobalListeners(addSpy)).toBe(2)

    wrapper.unmount()

    expect(countGlobalListeners(removeSpy)).toBe(2)
    expect(countGlobalListeners(documentRemoveSpy)).toBe(1)
  })

  it('does not let the opening click close a click-triggered tooltip', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Test', trigger: 'click', showDelay: 0, hideDelay: 0 },
      slots: { default: () => h('button', [h('span', { class: 'inner' }, 'Trigger')]) },
      attachTo: document.body,
    })

    // The click bubbles to document in the same tick the tooltip becomes visible
    wrapper.find('.inner').element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await new Promise(resolve => setTimeout(resolve, 10))
    await nextTick()

    expect(document.body.querySelector('.custom-tooltip')).not.toBeNull()

    wrapper.unmount()
  })

  it('closes a click-triggered tooltip when clicking outside', async () => {
    const outside = document.createElement('div')
    document.body.appendChild(outside)

    const wrapper = mount(Tooltip, {
      props: { content: 'Test', trigger: 'click', showDelay: 0, hideDelay: 0 },
      slots: { default: () => h('button', 'Trigger') },
      attachTo: document.body,
    })

    await wrapper.find('.tooltip-trigger').trigger('click')
    await new Promise(resolve => setTimeout(resolve, 10))
    await nextTick()
    expect(document.body.querySelector('.custom-tooltip')).not.toBeNull()

    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await new Promise(resolve => setTimeout(resolve, 10))
    await nextTick()

    expect(document.body.querySelector('.custom-tooltip')).toBeNull()

    wrapper.unmount()
    outside.remove()
  })
})
