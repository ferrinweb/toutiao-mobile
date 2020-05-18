import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入vant组件库
import Vant from 'vant'
// 导入vant的样式
import 'vant/lib/index.css'

// 这个插件可以自动设置rem基准值
import 'amfe-flexible'

// 导入自己全局的样式(放在后面的原因:自己的样式可覆盖第三方插件的样式)
import './styles/index.less'
// 导入github-markdown-css文件
import 'github-markdown-css'

// 在全局导入时间过滤文件
import '@/utils/dayjs'

// 注册全局使用组件
Vue.use(Vant)

Vue.config.productionTip = false
// 创建Vue根实例,将router、store配置到根实例中
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') // App根组件渲染到#app节点
