
/**
 * Vuex 容器
 *    获取方便
 *    响应式的
 * 本地存储
 *    持久化
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

// 以为下面都会用到user,为了方便以后修改，这里定义一个常量
const USER_KEY = 'user'

export default new Vuex.Store({
  state: {
    // null{token,refresh_token}
    // user: null// 当前用户登录状态(token)
    // localStorage本地存储
    // 令牌固定写法window.localStorage.getItem(获取)/setItem（设置）
    user: getItem(USER_KEY)
    // 未封装前写法
    // user: JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    // 修改state里面的数据
    // data变量，这里用来接收user
    setUser (state, data) {
      state.user = data
      // 为了避免页面刷新数据丢失，我们这里使用本地储存进行**持续化**
      setItem(USER_KEY, state.user)

      // 未封装前写法
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }

  },
  actions: {
  },
  modules: {
  }
})
