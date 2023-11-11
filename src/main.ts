import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { setupRouter } from './router'

const setupAPP = async () => {
  const app = createApp(App)
  app.use(createPinia())
  await setupRouter(app)
  app.mount('#app')
}

setupAPP().then(() => {})
