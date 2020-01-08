import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/register-vant'
// REM适配：动态设置 html 标签字体大小
import 'amfe-flexible'
// 加载全局样式
// 注意：该样式文件要放到第三方样式之后
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
