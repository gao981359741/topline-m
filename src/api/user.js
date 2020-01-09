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
