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
      <!-- 占位的盒子 -->
      <div slot="nav-right" class="nav-right-empty"></div>
      <!-- 汉堡按钮 -->
      <div
        slot="nav-right"
        class="wap-nav-wrap"
        @click="isShowPopup = !isShowPopup"
      >
        <van-icon
          name="wap-nav"
        />
      </div>
    </van-tabs>
    <!-- 弹层 -->
    <!-- 图标位置 -->
    <van-popup
      v-model="isShowPopup"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <channel-edit :user-channels="channels" />
    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from './components/channel-edit'
import ArticleList from './components/article-list'
import { getChannels } from '@/api/user'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [], // 用户的频道列表
      isShowPopup: true // 是否显示弹层
    }
  },
  components: { ArticleList, ChannelEdit },
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
  // 头部搜索区域
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
  // tab切换部分
  /deep/ .van-tab{
    height: 41px;
    color: #777;
    border-right: 1px solid #edeff3;
  }
  /deep/ .van-tab--active span{
    color: #333;
  }
  /deep/ .van-tabs__line{
    width: 15px !important;
    height: 3px;
    background-color: #3296fa;
    bottom: 22px;
  }
  // 占位的空盒子
  /deep/ .nav-right-empty{
    width: 33px;
    height: 40px;
    background-color: #ffffff;
    flex-shrink: 0; // 不参与父盒子的flex均分
  }
  // 汉堡菜单图标
  .wap-nav-wrap{
    position: fixed;
    right: 0;
    width: 33px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    opacity: 0.8;
    &::before{
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 40px;
      background: url(./linebg.png) no-repeat;
      background-size: contain;
    }
  }
}
</style>
