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
  <van-cell
    title="性别"
    :value="user.gender === 0 ? '男' : '女'"
    is-link
    @click="isEditGenderShow = true"
  />
  <van-cell
    title="生日"
    :value="user.birthday"
    is-link
    @click="isEditBirthday = true"
  />
  <!-- 修改用户名弹层 -->
  <van-popup
    v-model="isEditUsernameShow"
    position="bottom"
    :style="{ height: '100%' }"
    class="edit-name-pop"
  >
  <!-- 编辑用户名组件 -->
    <edit-username
      v-if="isEditUsernameShow"
      v-model="user.name"
      @close="isEditUsernameShow = false"
    />
  </van-popup>
  <!-- 修改用户性别弹层 -->
  <van-popup
    v-model="isEditGenderShow"
    position="bottom"
    class="edit-gender-pop"
  >
  <!-- 编辑用户性别组件 -->
    <edit-gender
      v-if="isEditGenderShow"
      v-model="user.gender"
      @close="isEditGenderShow = false"
    />
  </van-popup>
  <!-- 修改用户生日组件 -->
  <van-popup
    v-model="isEditBirthday"
    position="bottom"
  >
  <!-- 编辑用户性别组件 -->
    <edit-birthday
      v-if="isEditBirthday"
      v-model="user.birthday"
      @close="isEditBirthday = false"
    />
  </van-popup>
  </div>
</template>

<script>
import EditBirthday from './components/edit-birthday'
import EditGender from './components/edit-gender'
import EditUsername from './components/edit-username'
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  data () {
    return {
      user: {}, // 用户个人信息
      isEditUsernameShow: false, // 编辑用户名弹层是否显示
      isEditGenderShow: false, // 编辑用户性别弹层是否显示
      isEditBirthday: false // 编辑用户生日弹层是否显示
    }
  },
  components: { EditUsername, EditGender, EditBirthday },
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
