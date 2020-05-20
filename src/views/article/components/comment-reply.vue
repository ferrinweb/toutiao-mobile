<template>
  <div class="com-reply-container">
    <van-nav-bar :title="`${comment.reply_count}条回复`">
     <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <comment-item :comment="comment" />
    <comment-list
      :list="commentList"
      :source="comment.com_id"
      type="c"
      @reply-comment="isComentPopShow = true"
    />
    <van-cell class="pub-com">
      <van-button round class="pub-btn" slot="title" @click="isComentPopShow = true">写评论</van-button>
    </van-cell>
    <van-popup
      v-model="isComentPopShow"
      position="bottom"
    >
    <!-- 发布评论组件 -->
    <post-comment
      :target="comment.com_id"
      :article-id="articleId"
      @post-success="onPostSuccess" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
export default {
  name: 'CommentReply',
  data () {
    return {
      page: 1,
      perPage: 10,
      isComentPopShow: false,
      commentList: [] // 评论列表
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: { CommentItem, CommentList, PostComment },
  methods: {
    onPostSuccess (comment) {
      // 关闭弹层
      this.isComentPopShow = false
      // 将新加的评论放到最前面
      this.commentList.unshift(comment)
      // 更新视图
      this.comment.reply_count++
    }
  }
}
</script>

<style scoped lang="less">
.pub-com{
  display: flex;
  padding: 10px;
  align-items: center;
  .pub-btn{
    width: 100%;
    height: 44px;
  }
}
</style>
