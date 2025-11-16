import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'
import pkg from '../../package.json'

const baseUrl = 'https://github.com/borsTiHD/vue-custom-tooltip'
const npmUrl = 'https://www.npmjs.com/package/@borstihd/vue-custom-tooltip'

export default defineConfig({
  lang: 'en-US',
  title: 'Vue Custom Tooltip',
  description: 'A flexible and accessible Vue 3 tooltip component and directive with TypeScript support. Built with zero dependencies (except Vue 3), featuring automatic positioning, keyboard navigation, and full accessibility support.',
  lastUpdated: true,

  base: '/vue-custom-tooltip/', // Set base if deploying to a subpath
  vite: {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        //  Allows importing from 'src' using '@' prefix
        '@': path.resolve(__dirname, '../../src'),
      },
    },
  },

  themeConfig: {
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: `${baseUrl}/tree/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/component' },
      { text: 'Themes', link: '/themes/overview' },
      { text: 'Examples', link: '/examples/' },
      {
        text: `v${pkg.version}`,
        items: [
          { text: 'Changelog', link: `${baseUrl}/blob/main/CHANGELOG.md` },
          { text: 'NPM', link: npmUrl },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Registration Methods', link: '/guide/registration-methods' },
          ],
        },
        {
          text: 'Essentials',
          items: [
            { text: 'Component Usage', link: '/guide/component-usage' },
            { text: 'Directive Usage', link: '/guide/directive-usage' },
            { text: 'Programmatic Control', link: '/guide/programmatic-control' },
            { text: 'Global Configuration', link: '/guide/global-config' },
            { text: 'Runtime Configuration', link: '/guide/runtime-config' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Accessibility', link: '/guide/accessibility' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Component API', link: '/api/component' },
            { text: 'Directive API', link: '/api/directive' },
          ],
        },
      ],
      '/themes/': [
        {
          text: 'Themes',
          items: [
            { text: 'Overview', link: '/themes/overview' },
            // { text: 'Built-in Themes', link: '/themes/built-in' },
            // { text: 'Custom Themes', link: '/themes/custom' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic Usage', link: '/examples/' },
            { text: 'Form Integration', link: '/examples/forms' },
            { text: 'Accessibility', link: '/examples/accessibility' },
            // { text: 'Interactive', link: '/examples/interactive' },
            // { text: 'Positioning', link: '/examples/positioning' },
            // { text: 'Navigation', link: '/examples/navigation' },
            // { text: 'Theme Examples', link: '/examples/themes' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: baseUrl },
    ],

    footer: {
      message: `Released under the <a href="${baseUrl}/blob/main/LICENSE">MIT License</a>.`,
      copyright: `Copyright © 2025-${new Date().getFullYear()} <a href="https://github.com/borsTiHD">borsTiHD</a>`,
    },
  },
})
