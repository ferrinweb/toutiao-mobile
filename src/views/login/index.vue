<template>
  <div class="login-container">
    <!-- 头部 -->
    <van-nav-bar
      title="注册/登录"
      left-arrow
      class="nav-bar"
      @click-left="$router.back()"
    />
    <!-- 表单部分 -->
    <van-form @submit="onLogin">
      <van-field
        :rules="formRules.mobile"
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        type="number"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        :rules="formRules.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        type="number"
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
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 用户信息
      user: {
        mobile: '',
        code: ''
      },
      // 验证规则
      formRules: {
        mobile: [
          { required: true },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          { required: true },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    async onLogin () {
      // 登录中的loading展示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.user)
        console.log(res)
        // 将token存储在本地
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // 跳转到首页
        this.$router.push('/')
        // 提示登录成功
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('用户名或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    }
  }
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
