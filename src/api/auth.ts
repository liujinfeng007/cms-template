import { cmsRequest } from '@/request'
import { ControlOutlined } from '@ant-design/icons-vue'

// 根据用户token获取对应的权限路由
export const getPermissionRoutes = (token: string) => {
  // return cmsRequest.get('/fetch/cms', {
  //   params: {
  //     token
  //   }
  // })
  return Promise.resolve({
    data: ['demo', 'demo1', 'demoChild']
  })
}
// 根据用户token获取按钮权限
export const getPermissionButtons = (token?: string) => {
  // return cmsRequest.get('/fetch/cms/button', {
  //   params: {
  //     token
  //   }
  // })
  return Promise.resolve({
    data: ['delete', 'add', 'update']
  })
}
// 退出登录
export const fetchLogout = (token: string) => {
  return Promise.resolve({ code: 0 })
}
