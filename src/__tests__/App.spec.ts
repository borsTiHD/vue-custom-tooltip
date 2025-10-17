import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from '../App.vue'
import { VueCustomTooltip } from '../index'

describe('app', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [VueCustomTooltip],
      },
    })
    expect(wrapper.text()).toContain('Vue Custom Tooltip')
  })
})
