import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      outDirs: 'dist',
      bundleTypes: false,
      insertTypesEntry: true,
      entryRoot: 'src',
      include: ['env.d.ts', 'src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'VueCustomTooltip',
      fileName: format => `vue-custom-tooltip.${format}.js`,
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into your library
      external: ['vue'],
      output: {
        // Global vars to use in UMD build for externalized deps
        globals: {
          vue: 'Vue',
        },
        // Provide CSS file as a separate output
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'vue-custom-tooltip.css'
          }
          return assetInfo.name || 'asset'
        },
      },
    },
  },
})
