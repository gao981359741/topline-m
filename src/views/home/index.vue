<template>
  <div class="home-container">
    <!-- 最上面的登录 -->
    <van-nav-bar title="首页" fixed></van-nav-bar>

    <!-- 频道列表
    v-model="active"控制激活的标签
    title标签标题
    -->
    <van-tabs v-model="active">
      <!-- 通过插槽把面包按钮放进去 -->
      <van-icon class="wap-nav" slot="nav-right" name="wap-nav" @click="isChannelEditShow = true" />
      <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">
        <!-- 文章列表组件 -->
        <article-list :channel="channel"></article-list>
      </van-tab>
    </van-tabs>
    <!-- 编辑频道 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      round
      closeable
      close-icon-position="top-left"
    >
      <!-- 放入频道弹层组件
    :user-channel="userChannels"父传子
      -->
      <channel-edit
      :user-channels="userChannels"
      :active="active"
      @switch="onChannelSwitch">
      </channel-edit>
    </van-popup>
  </div>
</template>

<script>
// 加载
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  name: 'HomePage',
  // 注册组件
  components: { ArticleList, ChannelEdit },
  data () {
    return {
      active: 0, // 控制激活的标签页
      userChannels: [], // 用户频道列表
      isChannelEditShow: false // 弹层默认不显示
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
    },
    onChannelSwitch (index) {
      this.active = index// 切换激活频道
      this.isChannelEditShow = false// 关闭弹层
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
.wap-nav {
  position: fixed;
  right: 0;
  line-height: 44px;
  background: #fff;
  font-size: 30px;
  opacity: 0.9;
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
