import { SlidersTwoTone, FileTextTwoTone } from '@ant-design/icons-vue'

/**
 * 菜单路由
 */
/* todo 【请务必确保路由的name唯一,且访问路径采用小驼峰命名方式】  */
export const menuRoutes = [
  {
    path: '/demo',
    name: 'demo',
    redirect: (to: any) => {
      const { hash, params, query } = to
      return {
        name: 'demoChild',
        query,
        params,
        hash
      }
    },
    meta: {
      title: 'Demo',
      layout: 'basic',
      icon: SlidersTwoTone,
      keepAlive: false
    },
    children: [
      {
        path: 'demoChild',
        name: 'demoChild',
        component: () => import('@/views/demoChild.vue'),
        meta: {
          title: 'demoChild',
          layout: 'basic',
          icon: FileTextTwoTone,
          keepAlive: false,
          super: ['demo']
        }
      }
    ]
  },
  {
    path: '/demo1',
    name: 'demo1',
    component: () => import('@/views/demo1.vue'),
    meta: {
      title: 'demo1',
      layout: 'basic',
      icon: SlidersTwoTone,
      keepAlive: false
    }
  }
]
