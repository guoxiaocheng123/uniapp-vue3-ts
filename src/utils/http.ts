// 二次封装拦截器、请求函数



// 拦截 request 请求、uploadFile 文件上传
import { useMemberStore } from "@/stores"
const memberStore = useMemberStore()
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
// 添加拦截器
const httpInterceptor = {
  //拦截前触发
  invoke(options: UniApp.RequestOptions) {
    //非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 请求超时时间
    options.timeout = 10000
    //为小程序添加请求头
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 添加 token 请求头
    // const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)


//请求函数
interface Data<T> {
  code: string,
  msg: string,
  result: T
}
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success(result) {
        // 请求成功
        if (result.statusCode >= 200 && result.statusCode < 300) {
          resolve(result.data as Data<T>)
          // 401 => 清除用户信息，跳转登录
        } else if (result.statusCode === 401) {
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(result)
          // 其他错误
        } else {
          uni.showToast({
            icon: 'none',
            title: (result.data as Data<T>).msg || '请求错误'
          })
          reject(result)
        }
      },
      // 响应失败
      fail(error) {
        uni.showToast({
          icon: 'none',
          title: '网络错误,换个网络试试',
        })
        reject(error)
      }
    })
  })
}
