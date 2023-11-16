import { router } from '@/router/index'
import { useAuth } from '@/stores/auth'
import { getPermissionRoutes } from '@/api/auth'
import { menuRoutes } from '@/router/routes'
import lodash from 'lodash'
import { message } from 'ant-design-vue'
let routes: { name: string }[] = [] //该路由数组用于给cms菜单赋值

/**
 * 将接口返回的路由列表转换为router.ts中定义的路由列表
 * @param data
 */
export function handlePermissionRoutes(data: string[]) {
  const routeKeys = [...data]
  const filterRoutes = lodash.cloneDeep(menuRoutes)
  onFilterRoutes(filterRoutes, routeKeys)
  return filterRoutes
}
// 过滤路由
function onFilterRoutes(parentRoutes: any, routeKeys: string[]) {
  if (Array.isArray(parentRoutes) && parentRoutes.length) {
    parentRoutes.forEach((parentRoutesItem: any, index) => {
      if (!routeKeys.includes(parentRoutesItem.name)) {
        if (parentRoutes.length > 1) {
          parentRoutes.splice(index, 1)
        } else {
          parentRoutes.length = 0
        }
      } else {
        if (Array.isArray(parentRoutesItem.children) && parentRoutesItem.children.length) {
          onFilterRoutes(parentRoutesItem.children, routeKeys)
        }
      }
    })
  }
}

/**
 * 生成对应用户的权限路由
 */
export const dynamicRoutes = async () => {
  const store = useAuth()
  const token = store?.token
  if (token) {
    const result: any = await getPermissionRoutes(token)
    const filterRoutes = handlePermissionRoutes(result.data)
    if (Array.isArray(filterRoutes) && filterRoutes.length) {
      filterRoutes.forEach((item) => {
        router.addRoute(item) //退出登录时，需要将router的路由还原至初始数据
      })
      routes = lodash.cloneDeep(filterRoutes)
      return true
    } else {
      await message.error('暂无访问权限！', 1)
      await router.push('')
      return
    }
  }
}

export { routes }
