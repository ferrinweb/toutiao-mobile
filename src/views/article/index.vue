<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      class="nav-bar"
      @click-left="$router.back()"
    />
    <div class="article-wrap">
      <h1 class="title">{{article.title}}</h1>
    <!-- 用户信息 -->
    <van-cell
    center
    class="author-info-wrap"
    >
    <van-image
      slot="icon"
      round
      class="avatar"
      :src="article.aut_photo"
    />
    <div slot="title" class="autor-name">{{article.aut_name}}</div>
    <div slot="label" class="pubdate">{{article.pubdate}}</div>
    <van-button
      :type="article.is_followed ? 'default' : 'info'"
      :icon="article.is_followed ? '' : 'plus'"
      :loading="isFollowLoading"
      size="small"
      round
      class="to-fan-btn"
      @click="onFollow"
      >{{article.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>
    <!-- 正文内容 -->
    <div ref="article-content" v-html="article.content" class="markdown-body"></div>
    <!-- 文章评论列表组件 -->
    <comment-list :article-id="articleId" :list="commentList"></comment-list>
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        round
        class="comment-btn"
        type="default"
        size="small"
        @click="isComentPopShow = true"
        >写评论</van-button>
        <van-icon
          name="comment-o"
          info="123"
          color="#777"
        />
        <van-icon
          :color="article.is_collected ? 'orange' : '#777'"
          :name="article.is_collected ? 'star' : 'star-o'"
          @click="onCollect"
        />
        <van-icon
          :color="article.attitude === 1 ? 'hotpink' : '#777'"
          :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
          @click="onLike"
        />
        <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="isComentPopShow"
      position="bottom"
    >
    <!-- 发布评论组件 -->
    <post-comment :target="articleId" @post-success="postSuccess" />
    </van-popup>
  </div>
</template>

<script>
import PostComment from './components/post-comment'
import CommentList from './components/comment-list'
import { ImagePreview } from 'vant'
import {
  getArticle,
  collectArticle,
  deleteCollectArticle,
  zanArticle,
  deleteZanArticle
} from '@/api/article'
import { toFollow, offFollow } from '@/api/user'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      article: {}, // 根据id获取到文章详情
      isFollowLoading: false, // 控制关注按钮的loading
      isComentPopShow: false, // 评论的弹层显示状态
      commentList: []
    }
  },
  components: { CommentList, PostComment },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    // 加载文章详情
    async loadArticle () {
      const { data: { data } } = await getArticle(this.articleId)
      // console.log(data)
      this.article = data
      // 在数据变化之后拿到dom使用$nextTick函数
      this.$nextTick(() => {
        this.onPreviewImg()
      })
    },
    // 预览正文图片
    onPreviewImg () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPath = []
      // 循环遍历每一个img元素,并且注册点击事件
      imgs.forEach((img, index) => {
        imgPath.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPath,
            startPosition: index
          })
        }
      })
    },
    // 关注文章作者
    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 如果关注了那就取消关注
        await offFollow(this.article.aut_id)
      } else {
        // 如果没关注就添加关注
        await toFollow(this.article.aut_id)
      }
      // 服务器数据更新了,那么视图也应该更新
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    // 收藏文章
    async onCollect () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.is_collected) {
        await deleteCollectArticle(this.articleId)
      } else {
        await collectArticle(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(this.article.is_collected ? '收藏成功' : '取消收藏成功')
    },
    // 点赞文章
    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.attitude === 1) {
        // 如果点赞了那么取消点赞,并且添加数据
        await deleteZanArticle(this.articleId)
        this.article.attitude = -1
      } else {
        // 如果没有点赞那么请求添加点赞,并且更新数据
        await zanArticle(this.articleId)
        this.article.attitude = 1
      }
      this.$toast.success(this.article.attitude === 1 ? '点赞成功' : '取消点赞成功')
    },
    postSuccess (comment) {
      this.commentList.unshift(comment)
      this.isComentPopShow = false
    }
  }
}
</script>

<style scoped lang="less">
.article-container{
  background-color: #ffffff;
  .title{
    padding: 24px 24px 14px 14px;
    font-size: 20px;
    background: #ffffff;
    margin: 0;
  }
  .article-wrap{
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 44px;
    overflow-y: scroll;
  }
  .author-info-wrap{
    .avatar{
      width: 35px;
      height: 35px;
      margin-right: 10px;
    }
    .autor-name{
      font-size: 12px;
      color: #333;
    }
    .pubdate{
      font-size: 11px;
      color: #c7c7c7;
    }
    .to-fan-btn{
      width: 86px;
      height: 30px;
    }
  }
  .markdown-body{
    padding: 14px;
    background: #ffffff;
  }
  .article-bottom{
    position: fixed;
    height: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 14px;
    background: #ffffff;
    border-top: 1px solid #d8d8d8;
    .comment-btn{
      width: 142px;
      height: 21px;
      font-size: 15px;
      color: #aeaeae;
    }
  }
}
</style>
