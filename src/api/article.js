// 文章接口请求模块
import request from '@/utils/request'

// 封装获取文章模块
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
