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
// 根据文章id请求获取文章详情
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
