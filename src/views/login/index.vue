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
    <van-form
    ref="login-form"
    :show-error="false"
    :show-error-message="false"
    validate-first
    @submit="onLogin"
    @failed="onValidateFailed"
    >
      <van-field
        :rules="formRules.mobile"
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        type="number"
        name="mobile"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        :rules="formRules.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        type="number"
        name="code"
        center
        placeholder="请输入验证码"
      >
      <!-- 为了阻止这个发送验证码的按钮触发表单的提交,在click后面加上事件修饰符.prevent -->
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
          v-if="isShowCountDown"
          :time="1000*60"
          format="ss s"
          @finish="isShowCountDown = false"
          />
          <van-button
          v-else
          size="small"
          type="primary"
          class="send-btn"
          :loading="isShowLoading"
          @click.prevent="onSendMs"
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
import { login, getCode } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 用户信息
      user: {
        mobile: '',
        code: ''
      },
      // 发送验证码按钮是否展示loading
      isShowLoading: false,
      // 是否显示倒计时
      isShowCountDown: false,
      // 验证规则
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    // 验证通过请求登录的处理函数
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
    },
    // 表单验证不通过的处理函数
    onValidateFailed (err) {
      // console.log(err)
      if (err.errors[0]) {
        this.$toast.fail({
          message: err.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendMs () {
      try {
        // 验证手机号
        await this.$refs['login-form'].validate('mobile')
        // 验证通过
        // 展示loading
        this.isShowLoading = true
        // 请求短信验证码
        await getCode(this.user.mobile)
        // 展示倒计时
        this.isShowCountDown = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '请求太频繁了,请稍后重试'
        } else if (err && err.name === 'mobile') {
          message = '请输入手机号'
        } else {
          message = '未知的错误'
        }
        this.$toast.fail({
          message,
          position: 'top'
        })
      }
      // 不管验证通过还是未通过都需要关闭验证码的loading状态
      this.isShowLoading = false
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
