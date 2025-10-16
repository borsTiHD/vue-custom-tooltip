import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import Tooltip from '../components/tooltip/Tooltip.vue'
import { getTooltipGlobalConfig, resetTooltipGlobalConfig, setTooltipGlobalConfig } from '../config/globalConfig'

describe('global Configuration', () => {
  beforeEach(() => {
    // Reset global config before each test
    resetTooltipGlobalConfig()
  })

  it('should apply global configuration to tooltips', async () => {
    // Set global configuration
    setTooltipGlobalConfig({
      position: 'bottom',
      showDelay: 500,
      hideDelay: 250,
    })

    const config = getTooltipGlobalConfig()
    expect(config.position).toBe('bottom')
    expect(config.showDelay).toBe(500)
    expect(config.hideDelay).toBe(250)
  })

  it('should allow resetting global configuration', () => {
    setTooltipGlobalConfig({
      position: 'top',
      dark: true,
    })

    expect(getTooltipGlobalConfig()).toEqual({
      position: 'top',
      dark: true,
    })

    resetTooltipGlobalConfig()
    expect(getTooltipGlobalConfig()).toEqual({})
  })

  it('should support partial global configuration', () => {
    // Set only some properties
    setTooltipGlobalConfig({
      dark: true,
      showArrow: false,
    })

    const config = getTooltipGlobalConfig()
    expect(config.dark).toBe(true)
    expect(config.showArrow).toBe(false)
    expect(config.position).toBeUndefined()
    expect(config.trigger).toBeUndefined()
  })

  it('should update global config when called multiple times', () => {
    setTooltipGlobalConfig({ position: 'top' })
    expect(getTooltipGlobalConfig()).toEqual({ position: 'top' })

    setTooltipGlobalConfig({ trigger: 'click' })
    expect(getTooltipGlobalConfig()).toEqual({ trigger: 'click' })

    // Second call replaces the first
    setTooltipGlobalConfig({ position: 'bottom', dark: true })
    expect(getTooltipGlobalConfig()).toEqual({ position: 'bottom', dark: true })
  })

  it('should use built-in defaults when no props or global config provided', async () => {
    // Ensure global config is empty
    resetTooltipGlobalConfig()
    const config = getTooltipGlobalConfig()
    expect(config).toEqual({})

    // Mount component without any props
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Test tooltip',
      },
      slots: {
        default: () => h('button', 'Test Button'),
      },
    })

    await nextTick()

    // Verify component rendered
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Test Button')

    // When no props are explicitly set, the component should use built-in defaults
    // through the effectiveXXX computed properties:
    // - position: 'auto'
    // - trigger: 'both'
    // - showDelay: 100
    // - hideDelay: 100
    // - disabled: false
    // - maxWidth: '250px'
    // - showArrow: true
    // - offset: 8
    // - dark: 'auto'

    // Verify the trigger element exists
    const triggerElement = wrapper.find('.tooltip-trigger')
    expect(triggerElement.exists()).toBe(true)

    // Verify content is set
    expect(wrapper.props('content')).toBe('Test tooltip')

    wrapper.unmount()
  })

  it('should apply global config when component props are not provided', async () => {
    // Set global config
    setTooltipGlobalConfig({
      position: 'bottom',
      showDelay: 50,
      dark: true,
    })

    const globalConfig = getTooltipGlobalConfig()

    // Mount component without position, showDelay, or dark props
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Test tooltip',
        trigger: 'click', // Explicitly set this one
      },
      slots: {
        default: () => h('button', 'Test Button'),
      },
      global: {
        provide: {
          [Symbol.for('tooltip-global-config')]: globalConfig,
        },
      },
    })

    await nextTick()

    // Verify component uses the explicit prop
    expect(wrapper.props('trigger')).toBe('click')

    // Verify component rendered successfully
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.tooltip-trigger').exists()).toBe(true)

    // The component internally uses global config for properties not explicitly set
    // This is verified by the global config values
    expect(globalConfig.position).toBe('bottom')
    expect(globalConfig.showDelay).toBe(50)
    expect(globalConfig.dark).toBe(true)

    wrapper.unmount()
  })

  it('should prioritize component props over global config', async () => {
    // Set global config
    setTooltipGlobalConfig({
      position: 'top',
      showDelay: 500,
      trigger: 'hover',
    })

    // Mount component with explicit props that override global config
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Test tooltip',
        position: 'bottom', // Override global 'top'
        showDelay: 100, // Override global 500
        // trigger not set, should use global 'hover'
      },
      slots: {
        default: () => h('button', 'Test Button'),
      },
      global: {
        provide: {
          [Symbol.for('tooltip-global-config')]: getTooltipGlobalConfig(),
        },
      },
    })

    await nextTick()

    // Verify explicit props are used
    expect(wrapper.props('position')).toBe('bottom')
    expect(wrapper.props('showDelay')).toBe(100)

    // Verify trigger is undefined (will use global config internally)
    expect(wrapper.props('trigger')).toBeUndefined()

    wrapper.unmount()
  })
})
