// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import PresetSwitcher from '@/components/PresetSwitcher.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { VueCustomTooltip } from '@/index' // '../../../src/index'
// import Button from './components/Button.vue'
// import ThemeToggle from './components/ThemeToggle.vue'
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
    app.component('Card', Card)
    app.component('Button', Button)
    app.component('ThemeToggle', ThemeToggle)
    app.component('PresetSwitcher', PresetSwitcher)
  },
} satisfies Theme
