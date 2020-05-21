<template>
  <div class="edit-username">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
     <div class="username">
       <van-field
        v-model="username"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
     </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'EditUsername',
  data () {
    return {
      username: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    // 确定修改
    async onConfirm () {
      // loading
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      try {
        // 发送修改用户名的请求
        const { data } = await editUserProfile({
          name: this.username
        })
        console.log(data)
        // 修改成功发送事件给父组件更新昵称,并且关闭弹层
        this.$emit('input', data.data.name)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          // 如果用户昵称已存在
          this.$toast.fail('昵称已存在!')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.edit-username{
  .username{
    padding: 10px;
    .van-field{
      height: 80px;
    }
  }
}
</style>
