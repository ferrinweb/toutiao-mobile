import Vue from 'vue'
import Vuex from 'vuex'
// 导入封装好本地存储方法的js文件
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
// 为了方便,在这定义个常量,当做本地存储的名字
const USER_KEY = 'toutiao-user'
export default new Vuex.Store({
  state: {
    // 在Vuex容器中保存用户的登录状态,这样其他组件可以共享,方便取用,而且数据是响应式的
    user: getItem(USER_KEY) // 当前用户的登录状态
  },
  mutations: {
    setUser (state, data) {
      // 将state中的user设置成data,data中有token
      state.user = data
      // 将用户的token保存到本地存储,防止页面一刷新,state.user有变成初始化的值了
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
