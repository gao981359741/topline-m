// 文章频道接口模块

// 引入
import request from '@/utils/request'

// 获取用户文章列表
export const getUserChannels = () => {
  // 具体的请求代码
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'

  })
}
