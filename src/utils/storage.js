/**
 * 封装操作本地存储的工具方法模块
 */
/**
 * 获取指定数据
 * @param {String} 数据名称
 */
// 获取
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // 为了严谨设置情况
  // 如果
  try {
    return JSON.parse(data)
  } catch (err) { // 否则
    console.log('转换失败', err)

    return data
  }
}
/**
 * 存储数据
 * @param {String} 数据名称
 * @param {} 数据值
 */
// 设置
export const setItem = (name, value) => {
  const data = typeof value === 'object'
    ? JSON.stringify(value)
    : value
  window.localStorage.setItem(name, data)
}
/**
 * 删除数据
 * @param {String} 数据名称
 */
// 移除
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
