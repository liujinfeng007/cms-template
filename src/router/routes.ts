import { ControlOutlined } from '@ant-design/icons-vue'

/**
 * 菜单路由
 */
/* todo 【请务必确保路由的name唯一,切访问路径采用小驼峰命名方式】  */
export const menuRoutes = [
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo/index.vue'),
    redirect: {
      name: 'demoChild'
    },
    meta: {
      title: 'Demo',
      layout: 'basic',
      icon: ControlOutlined,
      keepAlive: false
    },
    children: [
      {
        path: 'demoChild',
        name: 'demoChild',
        component: () => import('@/views/demo-child/index.vue'),
        redirect: {
          name: 'demoChildChild'
        },
        meta: {
          title: 'DemoChild',
          layout: 'basic',
          icon: ControlOutlined,
          keepAlive: false,
          super: ['demo']
        },
        children: [
          {
            path: 'demoChildChild',
            name: 'demoChildChild',
            component: () => import('@/views/demo-child/index.vue'),
            meta: {
              title: 'demoChildChild',
              layout: 'basic',
              icon: ControlOutlined,
              keepAlive: false,
              super: ['demo', 'demoChild'] //父级name集合，用于menu组件的openKeys赋值
            }
          }
        ]
      }
    ]
  },
  {
    path: '/xx',
    name: 'xx',
    component: () => import('@/views/demo/index.vue'),
    meta: {
      title: 'xx',
      layout: 'basic',
      icon: ControlOutlined,
      keepAlive: false
    }
  }
]
