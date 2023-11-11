import { useAuth } from '@/stores/auth'

/**
 * 设置路由守卫
 * @param router
 */
export function setRouterGuards(router: any) {
  // 全局 前置路由守卫
  router.beforeEach((to: any, from: any, next: any) => {
    if (to.name !== 'login') {
      if (!useAuth().token) {
        next({
          name: 'login'
        })
      }
    }
    next()
  })
  // 全局 后置路由守卫
  router.afterEach((to: any, from: any, failure: any) => {})
}
