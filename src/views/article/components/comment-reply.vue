<template>
  <div class="com-reply-container">
   <van-nav-bar :title="`${comment.reply_count}条回复`">
     <van-icon slot="left" name="cross" @click="$emit('close')" />
   </van-nav-bar>
   <comment-item :comment="comment" />
   <comment-list :source="comment.com_id" type="c" />
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
export default {
  name: 'CommentReply',
  data () {
    return {
      page: 1,
      perPage: 10,
      commentReplyList: [] // 回复评论的列表
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: { CommentItem, CommentList },
  methods: {
  }
}
</script>

<style scoped lang="less">

</style>
