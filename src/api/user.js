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

// 获取短信验证码
export const getCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取当前用户信息
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取用户频道
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 关注用户
export const toFollow = authorId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: authorId
    }
  })
}
// 取消关注用户
export const offFollow = authorId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${authorId}`
  })
}
// 获取用户个人信息的接口
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
// 修改用户个人资料的接口
export const editUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
