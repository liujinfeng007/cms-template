import { routes } from '@/router/dynamic-routes'
import { h } from 'vue'

// 生成 sider菜单
export const generatorMenu = (_routes: any[] = routes) => {
  const temp: any[] = []
  _routes.forEach((item: any) => {
    temp.push({
      key: item.name,
      name: item.meta.title,
      path: item.path,
      icon: () => h(item.meta.icon)
    })
  })
  return temp
}
