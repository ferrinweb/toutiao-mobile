<template>
  <div class="post-comment-container">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      :disabled="!message"
      size="small"
      type="default"
      @click="onPostComment">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'PostComment',
  data () {
    return {
      message: ''
    }
  },
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  methods: {
    // 发布文章评论
    async onPostComment () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true
      })
      const { data: { data } } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      // console.log(data)
      this.$emit('post-success', data.new_obj)
      // 清空输入框
      this.message = ''
      this.$toast.success('发布成功')
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
