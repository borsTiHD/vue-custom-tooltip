// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import TooltipExample from '../../../src/components/showcase/TooltipExample.vue'
import { VueCustomTooltip } from '../../../src/index'
// import Button from '@/components/Button.vue'
import Button from './components/Button.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  enhanceApp({ app, router, siteData }) {
    app.use(VueCustomTooltip)
    app.component('Button', Button)
    app.component('TooltipExample', TooltipExample)
  },
} satisfies Theme
