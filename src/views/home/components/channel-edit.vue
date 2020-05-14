<template>
  <div class="channel-edit">
    <van-cell title="我的频道" class="title">
      <van-button
        type="danger"
        plain
        size="mini"
        round
      >编辑</van-button>
    </van-cell>
    <!-- 展示的用户频道 -->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in userChannels"
        :key="index"
        class="channel-item"
      >
        <div slot="text" class="channel-text">
          {{channel.name}}
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐部分 -->
    <van-cell title="频道推荐" class="title" />
    <!-- 展示的频道推荐 -->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in allChannels"
        :key="index"
        class="channel-item"
      >
        <div slot="text" class="channel-text">
          {{channel.name}}
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [] // 所有频道列表
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.onLoadAllChannels()
  },
  methods: {
    async onLoadAllChannels () {
      const { data: { data } } = await getAllChannels()
      this.allChannels = data.channels
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit{
  padding-top: 55px;
  .title{
    font-size: 16px;
    color: #333;
  }
  .channel-item{
    /deep/ .van-grid-item__content{
      width: 80px;
      height: 43px;
      background-color: #f4f5f6;
      .channel-text{
        font-size: 14px;
        color: #222;
      }
    }
  }
}
</style>
