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
  <van-cell
    title="昵称"
    :value="user.name"
    is-link
    @click="isEditUsernameShow = true"
  />
  <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
  <van-cell title="生日" :value="user.birthday" is-link />
  <!-- 用户名弹层 -->
  <van-popup
    v-model="isEditUsernameShow"
    position="bottom"
    :style="{ height: '100%' }"
    class="edit-name-pop"
  >
  <!-- 编辑用户个人信息弹层 -->
    <edit-username
      v-model="user.name"
      @update-name="user.name = $event"
      @close="isEditUsernameShow = false"
    />
  </van-popup>
  </div>
</template>

<script>
import EditUsername from './components/edit-username'
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  data () {
    return {
      user: {}, // 用户个人信息
      isEditUsernameShow: false
    }
  },
  components: { EditUsername },
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
  // 用户名修改弹层
  .edit-name-pop{
    background-color: #f5f7f9;
  }
}
</style>
