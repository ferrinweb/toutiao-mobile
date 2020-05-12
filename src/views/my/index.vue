<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="user-info">
      <!-- 用户个人信息部分 -->
      <van-cell
      :border="false"
      class="user-self-info"
      >
        <span slot="icon">
          <van-image
          round
          fit="cover"
          class="user-avatar"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </span>
        <span slot="title" class="user-name">用户名</span>
        <van-button
        type="default"
        size="small"
        :round="true"
        class="edit-btn"
        >
        编辑资料
        </van-button>
      </van-cell>
      <!-- 用户数据资料部分 -->
      <van-grid
      :border="false"
      class="user-data-info">
      <van-grid-item>
        <div slot="text" class="user-data-item">
          <div class="data">8</div>
          <div class="text">头条</div>
        </div>
      </van-grid-item>
      <van-grid-item class="user-data-item">
        <div slot="text">
          <div class="data">888</div>
          <div class="text">关注</div>
        </div>
      </van-grid-item>
      <van-grid-item class="user-data-item">
        <div slot="text">
          <div class="data">666</div>
          <div class="text">粉丝</div>
        </div>
      </van-grid-item>
      <van-grid-item class="user-data-item">
        <div slot="text">
          <div class="data">999</div>
          <div class="text">获赞</div>
        </div>
      </van-grid-item>
    </van-grid>
    </van-cell-group>
    <!-- 未登录用户展示部分 -->
    <div v-else class="no-login">
      <div class="avatar"><img src="./phone.png" /></div>
      <div class="text">登录/注册</div>
    </div>
    <!-- 收藏和历史部分 -->
    <van-grid :column-num="2" class="goto-looking-part mb-4">
      <van-grid-item class="part-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="part-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>
    <!-- 页面导航部分 -->
    <van-cell title="消息通知" is-link to="/" class="message" />
    <van-cell title="小智同学" is-link to="/" class="xiaozhi mb-4" />
    <van-cell v-if="user" title="退出登录" class="login-out" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  data () {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
  }
}
</script>

<style scoped lang="less">
// 用户信息部分样式
.user-info{
  background: url(./bg.png) no-repeat center;
  background-size: cover;
  // 用户个人信息部分
  .user-self-info{
    box-sizing: border-box;
    padding-top: 38px;
    padding-bottom: 11px;
    height: 115px;
    align-items: center;
    background-color: rgba(255, 255, 255, 0);
    .user-avatar{
      width: 66px;
      height: 66px;
      margin-right: 10px;
      box-sizing: border-box;
      border: 1px solid #ffffff;
    }
    .user-name{
      font-size: 16px;
      color: #ffffff;
    }
    .edit-btn{
      box-sizing: border-box;
      padding-top: 2px;
      width: 58px;
      height: 16px;
      font-size: 10px;
      color: #666666;
      border: none;
    }
  }
  // 用户数据信息部分
  .user-data-info{
    box-sizing: border-box;
    height: 65px;
    /deep/ .van-grid-item__content{
      background-color: unset;
      .data{
        font-size: 18px;
        text-align: center;
        color: #ffffff;
      }
      .text{
        font-size: 12px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
}
// 未登录展示的部分
.no-login{
  background: url(./bg.png) no-repeat;
  background-size: cover;
  box-sizing: border-box;
  height: 173px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .avatar img{
    width: 66px;
    height: 66px;
  }
  .text{
    font-size: 14px;
    color: #fff;
    margin-top: 4px;
  }
}
// 用户收藏和历史部分
.goto-looking-part{
  /deep/.part-item{
    box-sizing: border-box;
    height: 70px;
    .toutiao-shoucang{
      font-size: 22px;
      color: #eb5556;
    }
    .toutiao-lishi{
      font-size: 22px;
      color: #ff9d1d;
    }
    .van-grid-item__text{
      color: #333;
      font-size: 14px;
    }
  }
}
.message,.xiaozhi{
  font-size: 15px;
  color: #333333;
}
.mb-4{
  margin-bottom: 4px;
}
.login-out{
  text-align: center;
  color: #d86262;
  font-size: 15px;
}
</style>
