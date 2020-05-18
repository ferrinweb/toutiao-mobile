<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      class="nav-bar"
      @click-left="$router.back()"
    />
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
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { getArticle } from '@/api/article'
import { toFollow, offFollow } from '@/api/user'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      article: {}, // 根据id获取到文章详情
      isFollowLoading: false
    }
  },
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
    }
  }
}
</script>

<style scoped lang="less">
.article-container{
  .title{
    padding: 24px 24px 14px 14px;
    font-size: 20px;
    background: #ffffff;
    margin: 0;
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
    position: fixed;
    top: 175px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    padding: 14px;
    background: #ffffff;
  }
}
</style>
