import { createApp } from 'vue'
import App from './App.vue'
import {
  // Tooltip,
  // vTooltip,
  // setTooltipGlobalConfig,
  VueCustomTooltip,
} from './index'

import './assets/main.css'

// Set or update global configuration (for component and directive)
// setTooltipGlobalConfig({
//   position: 'right',
//   trigger: 'hover',
//   dark: false,
// })

const app = createApp(App)

// Different way to set global configuration
app.use(VueCustomTooltip, {
  theme: 'default', // Apply Default theme to all tooltips - 'default', 'primevue' or 'vuetify'
  // globalConfig: {
  //   position: 'top', // Default position for all tooltips
  //   trigger: 'hover', // Default trigger behavior
  //   showDelay: 200, // Default show delay (ms)
  //   hideDelay: 150, // Default hide delay (ms)
  //   dark: 'auto', // Auto detect dark mode
  //   showArrow: true, // Show arrow by default
  //   offset: 12, // Default offset from trigger
  //   maxWidth: '300px', // Default max width
  // },
})

app.mount('#app')
