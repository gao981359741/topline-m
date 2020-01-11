// 文章接口模块
import request from '@/utils/request'
// 获取指定用户的列表接口数据
export const getArticlesByUser = (userId, params) => {
  // 具体的请求代码
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}/articles`,
    params

  })
}
