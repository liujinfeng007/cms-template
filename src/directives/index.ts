import type { App } from 'vue'
import { permission, permissionArr } from '@/directives/permission'
import { getPermissionButtons } from '@/api/auth'
import { useAuth } from '@/stores/auth'
/**
 * 安装自定义指令
 */
export async function setupDirectives(app: App) {
  const store = useAuth()
  const { data } = await getPermissionButtons(store.token)
  permissionArr.length = 0
  permissionArr.push(...data)

  app.directive('permission', permission)
}
