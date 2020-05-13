<template>
  <div class="article-list">
    <van-pull-refresh
    v-model="isRefleshLoading"
    :success-text="successText"
    :success-duration="1500"
    @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoadArticles"
        >
        <van-cell v-for="(article, index) in articles" :key="index" :title="article.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      loading: false, // 上拉加载更多的loading
      finished: false, // 上拉是否加载完毕
      timestamp: null, // 时间戳
      isRefleshLoading: false, // 上拉刷新加载中
      successText: '' // 刷新成功提示文本
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
        channel_id: this.channel.id, // 频道id
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶
      })
      const results = data.results
      this.articles.push(...results)
      // 3.加载状态结束
      this.loading = false
      // 4.数据全部加载完成
      if (results.length) {
        // 如果还有数据,就把timestamp修改成这次请求结果中的pre_timestamp,代表前一页的数据
        this.timestamp = data.pre_timestamp
      } else {
        // 如果results的长度是0,进入这个区间,说明没有数据了
        this.finished = true
      }
    },
    async onRefresh () {
      // 请求获取数据
      const { data: { data } } = await getArticles({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(), // 时间戳,获取最新的数据
        with_top: 1 // 是否包含置顶
      })
      // console.log(data)
      const results = data.results
      // 将获取到最新的数据添加到文章列表的最前面
      this.articles.unshift(...results)
      // 关闭加载中
      this.isRefleshLoading = false
      // 提示刷新成功
      this.successText = `刷新成功,更新了${results.length}条数据` // 修改刷新成功提示文本
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
