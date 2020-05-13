<template>
  <van-cell class="article-item">
    <!-- 标题 -->
    <div slot="title" class="title van-multi-ellipsis--l3">{{article.title}}</div>
    <!-- 标签 -->
    <div slot="label">
      <!-- 这是三图封面展示的盒子 -->
      <div class="article-covers-wrap" v-if="article.cover.type === 3">
        <div
        class="cover-item"
        v-for="(image, index) in article.cover.images"
        :key="index"
        >
        <van-image
        class="mul-cover"
        fit="cover"
        :src="image" />
        </div>
      </div>
      <!-- 这是底部文章的标签文字 -->
      <div class="article-labels">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- 右侧图片,单图封面展示的盒子 -->
    <div v-if="article.cover.type === 1" class="single-cover-wrap">
      <van-image
      class="single-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item{
  // padding: 0 14px;
  // 文章标题
  .title{
    font-size: 16px;
    color: #3a3a3a;
    padding: 16px 0;
  }
  // 右侧单张封面
  /deep/ .van-cell__value{
    flex: unset;
  }
  .single-cover{
    width: 116px;
    height: 73px;
    padding-left: 12px;
  }
  // 三图封面
  .article-covers-wrap{
    display: flex;
    margin-bottom: 14px;
    .cover-item{
      flex: 1;
      &:not(:last-child){
        padding-right: 4px;
      }
      .mul-cover{
        height: 73px;
      }
    }
  }
  // 底部文章标签
  .article-labels span{
    color: #b4b4b4;
    font-size: 11px;
    margin-right: 12px;
  }
}
</style>
