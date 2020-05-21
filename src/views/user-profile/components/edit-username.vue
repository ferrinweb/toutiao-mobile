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
        v-model="message"
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
export default {
  name: 'EditUsername',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    onConfirm () {
      console.log('onConfirm')
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
