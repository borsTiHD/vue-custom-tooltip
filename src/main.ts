import { createApp } from 'vue'
import directives from '@/directives'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

app.use(directives)

app.mount('#app')
