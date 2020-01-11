<template>
  <div class="login-container">
    <!-- 最上面的登录 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 登录表单 -->
      <!--
      表单验证
      1、使用 ValidationObserver 组件把需要验证的整个表单包起来
      2、使用 ValidationProvider 组件把具体的表单元素包起来，例如 input
         name   配置字段的提示名称
         rules  配置校验规则
         v-slot="{ errors }" 获取校验失败的错误提示消息
     -->
     <validationObserver ref="form">
       <!-- immediate初始时自动效验 -->
       <validationProvider name="手机号" rules="required|mobile" immediate>
      <van-field
      v-model="user.mobile"
       clearable
       class="iconfont icon-shouji"
       placeholder="请输入手机号" />

    </validationProvider>

  <validationProvider name="验证码" rules="required|code" immediate>
      <van-field
       v-model="user.code"
      class="iconfont icon-iconfontmima1"  placeholder="请输入验证码" >
      <van-count-down
        v-if="isCountDownShow"
         :time="1000*60"
         slot="button"
        format="ss s"
        @finish="isCountDownShow=false"
        />
        <van-button
        @click="onSendSmsCode"
        v-else
        round
        slot="button"
        size="small"
        type="primary">发送验证码</van-button>
      </van-field>
 </validationProvider>
    </validationObserver>
    <!-- 登录按钮 -->
     <div class="login-btn-wrap">
    <van-button  type="info" @click="onLogin">登录</van-button>
     </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'// 表单验证包

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: ''// 验证码
      },
      isCountDownShow: false// 是否显示倒计时
    }
  },
  methods: {
    // 登录
    async  onLogin () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      // 验证成功success为true,否则为false
      // validate返回promise
      const success = await this.$refs.form.validate()
      // 如果验证的信息失败，则轻提示
      if (!success) {
        // 获取errors
        const errors = this.$refs.form.errors
        // 遍历
        for (let key in errors) {
          // 拿到每一项
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            // 找到第一个有错误的消息，给出提示，停止遍历
            return
          }
        }
        return
      }

      // 当点击登录按钮时的友好提示
      this.$toast.loading({
        // duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true// 是否禁止背景点击
      })
      // 3.请求登录
      try {
        const { data } = await login(user)
        console.log(data)
        // 将登录成功获取的用户信息token相关的数据储存到Vuex容器
        this.$store.commit('setUser', data.data)
        // 提示成功
        this.$toast.success('登录成功')
        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        this.$toast.fail('登录失败,手机号或验证码不正确')
      }

      // 4.根据后端返回结果执行后续业务处理
    },
    // 发送验证码
    async onSendSmsCode () {
      try {
        // 解构赋值拿到手机号
        const { mobile } = this.user
        // 1.验证手机号是否有效
        // 参数1：要验证的数据  这里指mobile
        // 参数2：验证规则 规则和规则之间用管道分割
        // 参数3：一个可选的配置对象
        // validateResult返回值：{valid，errors.......}
        //          valid: 验证是否成功，成功 true，失败 false
        //          errors：一个数组，错误提示消息
        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })

        // 如果验证失败，提示错误消息，停止发送验证码
        if (!validateResult.valid) {
          this.$toast(validateResult.errors[0])
          return
        }
        // 2.请求发送短信验证码
        const res = await getSmsCode(mobile)
        console.log(res)
        // 3.显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        console.log(err)
        this.$toast('请勿频繁操作')
      }
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
