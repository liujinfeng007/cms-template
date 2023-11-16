import { routes } from '@/router/dynamic-routes'
import { h } from 'vue'

// 生成 sider菜单
export const generatorMenu = () => {
  const menuList: any[] = []
  hasChild(routes, menuList)
  return menuList
}

export const hasChild = (_routes: any, parent: any) => {
  _routes.forEach((item: any) => {
    const handleItem = {
      key: item.name,
      label: item.meta.title,
      title: item.meta.title,
      path: item.path,
      icon: () => h(item.meta.icon),
      children: []
    }
    parent.push(handleItem)
    if (Array.isArray(item.children) && item.children.length) {
      hasChild(item.children, handleItem.children)
    } else {
      Reflect.deleteProperty(handleItem, 'children')
    }
  })
}
