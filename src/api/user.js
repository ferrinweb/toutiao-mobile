// 用户方面接口
import request from '@/utils/request'
// 用户登录接口封装
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
