<template>
  <div class="user-profile">
    <van-nav-bar
    title="个人信息"
    left-arrow
    class="nav-bar"
    @click-left="$router.back()"
  />
  <van-cell title="头像" is-link center>
    <van-image
      fit="cover"
      round
      class="user-avatar"
      :src="user.photo"
    />
  </van-cell>
  <van-cell title="昵称" :value="user.name" is-link />
  <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
  <van-cell title="生日" :value="user.birthday" is-link />
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.loaderUserProfile()
  },
  methods: {
    async loaderUserProfile () {
      const { data } = await getUserProfile()
      // console.log(data)
      this.user = data.data
    }
  }
}
</script>

<style scoped lang="less">
.user-profile{
  .user-avatar{
    width: 35px;
    height: 35px;
  }
}
</style>
