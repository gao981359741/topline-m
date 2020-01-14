// 文章接口模块
import request from '@/utils/request'
// 获取指定用户的列表接口数据
export const getArticlesByUser = (userId, params) => {
  // 具体的请求代码
  return request({
    method: 'GET',
    // 这里出现了问题，地址前面多了一个空格，导致获取不到数据
    url: `/app/v1_0/users/${userId}/articles`,
    params
  })
}

/**
 * 获取频道的文章列表
 */
export const getArticlesByChannel = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
