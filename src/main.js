import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 创建Vue根实例,将router、store配置到根实例中
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') // App根组件渲染到#app节点
