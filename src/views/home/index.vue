<template>
  <div class="home-container">
    <!-- 头部搜索区 -->
    <van-nav-bar
      class="nav-bar"
    >
      <van-button
      round
      size="small"
      type="info"
      slot="title"
      class="search-btn"
      >
      <van-icon name="search" />
      <span class="text">搜索</span>
      </van-button>
    </van-nav-bar>
    <!-- 频道tab栏 -->
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <article-list :channel="channel"></article-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import { getChannels } from '@/api/user'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [] // 用户的频道列表
    }
  },
  components: { ArticleList },
  created () {
    this.onGetChannels()
  },
  methods: {
    async onGetChannels () {
      const { data: { data } } = await getChannels()
      this.channels = data.channels
    }
  }
}
</script>

<style scoped lang="less">
.home-container{
  /deep/.van-nav-bar__title{
    max-width: 80%;
    .search-btn{
      // display: flex;
      // justify-content: center;
      // align-items: center;
      width: 277px;
      height: 32px;
      border: none;
      background-color: #5babfb;
      .van-icon{
        color: #ffffff;
        font-size: 16px;
        margin-right: 2px;
      }
      .text{
        color: #ffffff;
        font-size: 14px;
      }
    }
  }
}
</style>
