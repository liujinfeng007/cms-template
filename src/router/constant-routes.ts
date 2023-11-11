/**
 * 固定路由
 */
export const constantRoutes = [
  {
    path: '/', //  '/' | '' 同效果
    name: 'home',
    redirect: '/demo',
    meta: {
      title: '首页',
      keepAlive: true,
      layout: 'basic'
    }
  },
  {
    path: '/login', //  '/' | '' 同效果
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      layout: 'blank'
    }
  }
]
