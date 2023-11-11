import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from '@/router/constant-routes'
import type { App } from 'vue'
import { setRouterGuards } from '@/router/router-guards'
import { dynamicRoutes } from '@/router/dynamic-routes'
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

/**
 * 安装路由
 * @param app
 */
async function setupRouter(app: App) {
  await dynamicRoutes()
  app.use(router)
  setRouterGuards(router)
  await router.isReady()
}

export { setupRouter }
