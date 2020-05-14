<template>
  <div class="channel-edit">
    <van-cell title="我的频道" class="title">
      <van-button
        type="danger"
        plain
        size="mini"
        round
        @click="isEdit = !isEdit"
      >{{isEdit? '完成' : '编辑'}}</van-button>
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
        <van-icon v-show="isEdit && index !== 0" slot="icon" name="clear" class="close" />
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐部分 -->
    <van-cell title="频道推荐" class="title" />
    <!-- 展示的频道推荐 -->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        class="channel-item"
        @click="addChannel(channel,index)"
      >
        <div slot="text" class="channel-text">
          {{channel.name}}
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
import { getAllChannels, editUserChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [], // 所有频道列表
      isEdit: false
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
  computed: {
    ...mapState(['user']),
    // 获取推荐频道(所有频道中除了用户频道的频道)
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(value => {
          return channel.id === value.id
        })
      })
    }
  },
  methods: {
    // 加载所有频道的处理函数
    async onLoadAllChannels () {
      const { data: { data } } = await getAllChannels()
      this.allChannels = data.channels
    },
    // 添加频道的处理函数
    async addChannel (channel, index) {
      // 添加频道
      this.userChannels.push(channel)
      // 判断用户是否登录
      if (this.user) {
        // 如果用户处于登录状态,请求添加频道
        await editUserChannels({
          channels: [{
            id: channel.id,
            seq: this.userChannels.length
          }]
        })
      } else {
        // 如果是未登录状态,那么将用户的频道存储到本地
        setItem('channels', this.userChannels)
      }
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
      /deep/ .van-grid-item__icon-wrapper{
        width: 16px;
        height: 16px;
        position: absolute;
        top: -5px;
        right: -5px;
        color: #ccc;
        font-size: 16px;
      }
    }
  }
}
</style>
