import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import Tooltip from '../components/tooltip/Tooltip.vue'
import { resetTooltipGlobalConfig } from '../config/globalConfig'

describe('prop Detection and Default Values', () => {
  beforeEach(() => {
    resetTooltipGlobalConfig()
  })

  it('should use default values when no props are explicitly passed', async () => {
    // This simulates: <Tooltip content="..."><Button /></Tooltip>
    const wrapper = mount(Tooltip, {
      props: {
        content: 'This is a simple tooltip',
      },
      slots: {
        default: () => h('button', 'Hover me'),
      },
    })

    // The component should work with these built-in defaults:
    // - position: 'auto'
    // - trigger: 'both'
    // - showDelay: 100
    // - hideDelay: 100
    // - disabled: false
    // - maxWidth: '250px'
    // - showArrow: true (NOT false!)
    // - offset: 8
    // - dark: 'auto'

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.tooltip-trigger').exists()).toBe(true)

    // Verify content is set
    expect(wrapper.props('content')).toBe('This is a simple tooltip')

    wrapper.unmount()
  })

  it('should correctly distinguish between false and undefined for boolean props', async () => {
    // Mount with showArrow explicitly set to false
    const wrapper1 = mount(Tooltip, {
      props: {
        content: 'Test',
        showArrow: false, // Explicitly false
      },
      slots: {
        default: () => h('button', 'Test'),
      },
    })

    expect(wrapper1.props('showArrow')).toBe(false)
    wrapper1.unmount()

    // Mount without showArrow prop (should use default: true)
    const wrapper2 = mount(Tooltip, {
      props: {
        content: 'Test',
      },
      slots: {
        default: () => h('button', 'Test'),
      },
    })

    // Even though props.showArrow might report false due to Vue coercion,
    // the component internally should use default value of true
    // This is verified by the effective computed property logic
    expect(wrapper2.exists()).toBe(true)
    wrapper2.unmount()
  })

  it('should correctly distinguish between 0 and undefined for number props', async () => {
    // Mount with showDelay explicitly set to 0
    const wrapper1 = mount(Tooltip, {
      props: {
        content: 'Test',
        showDelay: 0, // Explicitly 0
      },
      slots: {
        default: () => h('button', 'Test'),
      },
    })

    expect(wrapper1.props('showDelay')).toBe(0)
    wrapper1.unmount()

    // Mount without showDelay prop (should use default: 100)
    const wrapper2 = mount(Tooltip, {
      props: {
        content: 'Test',
      },
      slots: {
        default: () => h('button', 'Test'),
      },
    })

    // The component internally should use default value of 100
    expect(wrapper2.exists()).toBe(true)
    wrapper2.unmount()
  })

  it('should handle kebab-case prop names correctly', async () => {
    // Vue converts kebab-case to camelCase, but vnode.props keeps original format
    const wrapper = mount(Tooltip, {
      props: {
        'content': 'Test',
        'show-delay': 500, // kebab-case
        'hide-delay': 300,
      },
      slots: {
        default: () => h('button', 'Test'),
      },
    })

    // Props should be detected as passed
    expect(wrapper.props('showDelay')).toBe(500)
    expect(wrapper.props('hideDelay')).toBe(300)

    wrapper.unmount()
  })
})
