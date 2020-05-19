// 初始化dayjs相关配置
// 引入dayjs
import dayjs from 'dayjs'
// 加载语言配置
import 'dayjs/locale/zh-cn'
// 引入相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
// 加载Vue
import Vue from 'vue'

// 配置使用相对时间
dayjs.extend(relativeTime)
// 配置使用中文包
dayjs.locale('zh-cn') // 全局使用

// 配置全局过滤器函数
// 配置相对时间
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
// 配置一定格式得时间
Vue.filter('formatT', value => {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
})
