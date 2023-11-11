import { cmsRequest } from '@/request'

// 根据用户token获取对应的权限路由
export const getPermissionRoutes = (token: string) => {
  // return cmsRequest.get('/fetch/cms', {
  //   params: {
  //     token
  //   }
  // })
  return Promise.resolve({ data: ['demo'] })
}
// 退出登录
export const fetchLogout = (token: string) => {
  return Promise.resolve({ code: 0 })
}
