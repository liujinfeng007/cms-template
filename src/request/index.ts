import axios from 'axios'
import { useAuth } from '@/stores/auth'

/**
 * 实例化axios
 * @param baseUrl 请求基地址
 * @param ContentType 请求头 content-type
 */
export function createAxiosInstance(
  baseUrl = import.meta.env.VITE_BASE_URL,
  ContentType = 'application/x-www-form-urlencoded;charset=utf-8'
) {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 9000,
    withCredentials: false,
    headers: {
      'Content-Type': ContentType
    }
  })
  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      const store = useAuth()
      config.headers.Authorization = store?.token
      return config
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      return response
    },
    function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error)
    }
  )
  return instance
}
const cmsRequest = createAxiosInstance()
export { cmsRequest }
