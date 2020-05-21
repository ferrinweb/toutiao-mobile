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
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
  </van-cell>
  <van-cell title="昵称" value="hello" is-link />
  <van-cell title="性别" value="女" is-link />
  <van-cell title="生日" value="2019-12-16" is-link />
  </div>
</template>

<script>
export default {
  name: 'UserProfile'
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
