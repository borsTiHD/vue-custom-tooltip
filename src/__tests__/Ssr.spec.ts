// @vitest-environment node

import { beforeEach, describe, expect, it } from 'vitest'
import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import Tooltip from '@/components/tooltip/Tooltip.vue'
import { resetTooltipGlobalConfig } from '@/config/index'
import { vTooltip, VueCustomTooltip } from '@/index'
import { isClient } from '@/utils/ssr'

describe('sSR rendering', () => {
  beforeEach(() => {
    resetTooltipGlobalConfig()
  })

  it('detects a non-browser environment', () => {
    expect(isClient).toBe(false)
    expect(typeof window).toBe('undefined')
    expect(typeof document).toBe('undefined')
  })

  it('renders the component mode trigger without touching the DOM', async () => {
    const app = createSSRApp({
      render: () => h(Tooltip, { content: 'Hello' }, { default: () => h('button', 'Trigger') }),
    })

    const html = await renderToString(app)

    expect(html).toContain('tooltip-wrapper')
    expect(html).toContain('Trigger')
    expect(html).not.toContain('custom-tooltip')
  })

  it('does not render a teleport when the tooltip is initially visible', async () => {
    const app = createSSRApp({
      render: () => h(Tooltip, { content: 'Hello', modelValue: true }, { default: () => h('button', 'Trigger') }),
    })

    const html = await renderToString(app)

    expect(html).not.toContain('teleport')
    expect(html).not.toContain('custom-tooltip')
  })

  it('installs the plugin with a theme without accessing document', async () => {
    const app = createSSRApp({
      render: () => h(Tooltip, { content: 'Themed' }, { default: () => h('span', 'Trigger') }),
    })
    app.use(VueCustomTooltip, {
      theme: 'vuetify',
      globalConfig: { position: 'top', showDelay: 0 },
    })

    await expect(renderToString(app)).resolves.toContain('Trigger')
  })

  it('renders elements using the directive without errors', async () => {
    const Host = defineComponent({
      directives: { tooltip: vTooltip },
      template: '<button v-tooltip="\'Directive tooltip\'">Directive trigger</button>',
    })

    const html = await renderToString(createSSRApp(Host))

    expect(html).toContain('Directive trigger')
    expect(html).not.toContain('data-tooltip-directive-container')
  })
})
