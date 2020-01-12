<template>
  <div class="home-container">
 <!-- 最上面的登录 -->
    <van-nav-bar title="首页"></van-nav-bar>

    <!-- 频道列表
    v-model="active"控制激活的标签
    title标签标题

    -->
<van-tabs v-model="active">
  <van-tab :title="channel.name"
  v-for="channel in userChannels"
  :key="channel.id"
  >
    <!-- 文章列表 -->

  </van-tab>
</van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
export default {
  name: 'HomePage',
  data () {
    return {
      active: 0, // 控制激活的标签页
      userChannels: []// 用户频道列表
    }
  },
  created () {
    // 加载用户频道列表
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels () {
      try {
        const { data } = await getUserChannels()
        // console.log(data)
        this.userChannels = data.data.channels
      } catch (err) {
        console.log(err)
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style>

</style>
