import { router } from '@/router/index'
import { useAuth } from '@/stores/auth'
import { getPermissionRoutes } from '@/api/auth'
import { menuRoutes } from '@/router/routes'
const routes: { name: string }[] = [] //该路由数组用于给cms菜单赋值

/**
 * 生成对应用户的权限路由
 */
export const dynamicRoutes = async () => {
  const store = useAuth()
  const token = store?.token
  if (token) {
    const result: any = await getPermissionRoutes(token)
    Array.isArray(result.data) &&
      result.data.forEach((item: any) => {
        const res = menuRoutes.find((_item: { name: string }) => {
          return _item.name === item
        })
        if (res) {
          routes.push(res)
          router.addRoute(res) //退出登录时，需要将router的路由还原至初始数据
        }
      })
  }
}

export { routes }
