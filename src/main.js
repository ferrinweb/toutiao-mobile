import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
// 导入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 自动设置rem基准值
import 'amfe-flexible'
// 注册全局使用组件
Vue.use(Vant)

Vue.config.productionTip = false
// 创建Vue根实例,将router、store配置到根实例中
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') // App根组件渲染到#app节点
