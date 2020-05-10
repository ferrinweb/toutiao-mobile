<template>
  <div class="my-container">
    <van-cell-group>
      <!-- 用户个人信息部分 -->
      <van-cell>
        <span slot="icon">
          <van-image
          width="50"
          height="50"
          round
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </span>
        <span slot="title">头条号</span>
        <van-button
        type="default"
        size="small"
        :round="true"
        >
        编辑资料
        </van-button>
      </van-cell>
      <!-- 用户数据资料部分 -->
      <van-grid>
      <van-grid-item>
        <div slot="text">
          <div class="data">8</div>
          <div class="text">头条</div>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div slot="text">
          <div class="data">888</div>
          <div class="text">关注</div>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div slot="text">
          <div class="data">666</div>
          <div class="text">粉丝</div>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div slot="text">
          <div class="data">999</div>
          <div class="text">获赞</div>
        </div>
      </van-grid-item>
    </van-grid>
    </van-cell-group>
    <!-- 收藏和历史部分 -->
    <van-grid :column-num="2">
      <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>
    <!-- 页面导航部分 -->
    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/" />
    <van-cell title="退出登录" class="login-out" />
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style scoped lang="less">
.login-out{
  text-align: center;
}
</style>
