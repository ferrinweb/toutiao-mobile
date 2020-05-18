import axios from 'axios'
import store from '@/store/'
import jsonBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 接口基础路径
  transformResponse: [function (data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
