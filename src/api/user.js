// 用户请求相关模块
// 引入
import request from '@/utils/request'
// 导出
// 登录接口
export const login = data => {
  // 具体的请求代码
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码接口  mobile手机号
export const getSmsCode = mobile => {
  // 具体的请求代码
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`

  })
}
// 获取当前登录用户信息接口
export const getUserInfo = () => {
  // 具体的请求代码
  return request({
    method: 'GET',
    url: '/app/v1_0/user'

  })
}

// 获取指定用户登录信息接口
export const getUserById = userId => {
  // 具体的请求代码
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}`

  })
}
