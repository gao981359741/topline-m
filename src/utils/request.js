// 封装axios请求模块
// 引入
import axios from 'axios'
import jsonBig from 'json-bigint'

// axios.create 方法,复制一个 axios

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
// data后端返回的原始数据  处理了id失真问题
request.defaults.transformResponse = [function (data) {
  // 如果转换成功则返回成功的结果给请求使用
  try {
    return jsonBig.parse(data)
    // 如果转换失败则进入 catch，返回一个空对象
    // err错误
  } catch (err) {
    console.log('转换失败', err)
    return {}
  }
}]

// 导出
export default request
