import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { setupRouter } from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setupDirectives } from '@/directives'

const setupAPP = async () => {
  const app = createApp(App)
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
  await setupDirectives(app)
  await setupRouter(app)
  app.mount('#app')
}

setupAPP().then(() => {})
