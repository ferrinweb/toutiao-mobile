<template>
  <div class="post-comment-container">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button size="small" type="default">发布</van-button>
  </div>
</template>

<script>
export default {
  name: 'PostComment',
  data () {
    return {
      message: ''
    }
  }
}
</script>

<style scoped lang="less">
.post-comment-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
