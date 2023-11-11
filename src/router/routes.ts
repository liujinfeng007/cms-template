import { ControlOutlined } from '@ant-design/icons-vue'

/**
 * 菜单路由
 */
export const menuRoutes = [
  // 应用管理
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo/index.vue'),
    meta: {
      title: 'Demo',
      layout: 'basic',
      icon: ControlOutlined,
      keepAlive: true
    }
  }
]
