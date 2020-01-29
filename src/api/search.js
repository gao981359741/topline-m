// 搜索接口模块
import request from '@/utils/request'

// 获取联想建议接口数据
export const getSuggestions = q => {
  // 具体的请求代码
  return request({
    method: 'GET',
    // 这里出现了问题，地址前面多了一个空格，导致获取不到数据
    url: '/app/v1_0/suggestion',
    params: {
      q

    }
  })
}
