import { createApp } from 'vue'
import directives from '@/directives'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(directives)

app.mount('#app')
