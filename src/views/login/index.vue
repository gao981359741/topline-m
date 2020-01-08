<template>
  <div class="login-container">
    <!-- 最上面的登录 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 登录表单 -->
    <van-cell-group>
      <van-field
      v-model="user.mobile"
       clearable
       class="iconfont icon-shouji"
       placeholder="请输入手机号" />
      <van-field
       v-model="user.code"
      class="iconfont icon-iconfontmima1"  placeholder="请输入验证码" >
        <van-button
        round
        slot="button"
        size="small"
        type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
     <div class="login-btn-wrap">
    <van-button  type="info" @click="onLogin">登录</van-button>
     </div>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: ''// 验证码
      }
    }
  },
  methods: {
    async  onLogin () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证

      // 当点击登录按钮时的友好提示
      this.$toast.loading({
        // duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true// 是否禁止背景点击
      })
      // 3.请求登录
      try {
        const res = await login(user)
        console.log(res)
        // 提示成功
        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('登录失败')
      }

      // 4.根据后端返回结果执行后续业务处理
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .van-cell{
    align-items: center
  }
  .login-btn-wrap {
    padding: 27px 16px;
    .van-button {
      width: 100%;
      background: #6db4fb;
    }
  }
}
</style>
