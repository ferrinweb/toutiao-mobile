<template>
  <div class="article-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoadArticles"
        >
        <van-cell v-for="(article, index) in articles" :key="index" :title="article.title" />
        </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoadArticles () {
      // 1.封装数据接口
      // 2.请求获取数据
      const { data: { data } } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const results = data.results
      this.articles.push(...results)
      // 3.加载状态结束
      this.loading = false
      // 4.数据全部加载完成
      if (results.length) {
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
.article-list{
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: scroll;
}
</style>
