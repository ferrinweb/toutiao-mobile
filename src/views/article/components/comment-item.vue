<template>
  <div class="com-item-container">
    <van-cell>
      <van-image
        slot="icon"
        round
        center
        fit="cover"
        class="avatar"
        :src="comment.aut_photo"
      />
      <div slot="title" class="comment-wrap">
        <div class="username-wrap">
          <span class="user-name">{{comment.aut_name}}</span>
          <!-- 点赞评论图标 -->
          <span @click="commentLikeOprate">
            <van-icon :class="{like: comment.is_liking}" :name="comment.is_liking ? 'good-job' : 'good-job-o'" />
            <span class="like-count">{{comment.like_count}}</span>
          </span>
        </div>
        <div class="user-content">{{comment.content}}</div>
        <div class="bottom-wrap">
          <span class="pubtime">{{comment.pubdate | formatT}}</span>
          <!-- 回复按钮图标 -->
          <van-button
            type="default"
            size="small"
            class="reply-btn"
            round
            @click="$emit('reply-comment', comment)"
          >{{comment.reply_count}} 回复</van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { toLikeComment, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 点赞/取消点赞的函数
    async commentLikeOprate () {
      this.$toast.loading({
        message: '点赞中...',
        forbidClick: true
      })
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        await deleteCommentLike(commentId)
        this.comment.like_count--
      } else {
        await toLikeComment(commentId)
        this.comment.like_count++
      }
      // 更新视图
      this.comment.is_liking = !this.comment.is_liking
      this.$toast.success(this.comment.is_liking ? '点赞成功' : '取消点赞成功')
    }
  }
}
</script>

<style scoped lang="less">
.com-item-container{
  // 头像
  .avatar{
    width: 35px;
    height: 35px;
    margin-right: 12px;
  }
  .username-wrap{
    display: flex;
    justify-content: space-between;
    // 评论者名字
    .user-name{
      color: #406599;
      font-size: 12px;
    }
    .like-count{
      font-size: 12px;
      margin-left: 1px;
    }
    .like{
      color: hotpink;
    }
  }
  // 评论正文部分
  .user-content{
    font-size: 14px;
    color: #222222;
  }
  .bottom-wrap{
    display: flex;
    align-items: center;
    font-size: 11px;
    .pubtime{
      color: #353535;
      margin-right: 10px;
    }
    .reply-btn{
      color: #3f3f3f;
    }
  }
}
</style>
