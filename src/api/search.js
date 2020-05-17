// 搜索相关模块接口
import request from '@/utils/request'
export const getSearchResults = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
