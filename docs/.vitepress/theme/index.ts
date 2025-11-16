// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'

import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

import Button from '../../../src/components/Button.vue' // '@/components/Button.vue'
import Card from '../../../src/components/Card.vue' // '@/components/Card.vue'
import PresetSwitcher from '../../../src/components/PresetSwitcher.vue' // '@/components/PresetSwitcher.vue'
import ThemeToggle from '../../../src/components/ThemeToggle.vue' // '@/components/ThemeToggle.vue'
import { VueCustomTooltip } from '../../../src/index' // '@/index'

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
