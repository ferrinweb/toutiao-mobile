<template>
  <div class="login-container">
    <!-- 头部 -->
    <van-nav-bar
      title="注册/登录"
      left-arrow
      class="nav-bar"
      @click-left="$router.back()"
    />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
      >
      <template #button>
        <van-button
        size="small"
        type="primary"
        class="send-btn"
        >
        发送验证码
        </van-button>
      </template>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn-wrap">
      <van-button
      type="primary"
      block
      class="login-btn"
      >
      登录
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.login-container{
  .send-btn{
    width: 76px;
    height: 23px;
    border-radius: 12px;
    font-size: 11px;
    color: #666666;
    background-color: #ededed;
    border: none;
  }
  .login-btn-wrap{
    padding: 26px 16px;
    .login-btn{
      background-color: #6db4fb;
      color: #fff;
      border: none;
    }
  }
}
</style>
