
<template>
  <!-- 弹层组件    频道-->
  <div class="channel-edit">
    <!-- :border="false"  是否显示边框 -->
    <van-cell title="我的频道" :border="false">
        <!--type="danger"背景红色  -->
      <van-button size="mini" round type="danger">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10" clickable>
      <van-grid-item v-for="channel in userChannels"
      :key="channel.id"
      :text="channel.name" />
    </van-grid>
    <van-cell class="channel-header" title="推荐频道" :border="false" />
   <van-grid :gutter="10" clickable>
      <van-grid-item v-for="channel in remainingChannels"
      :key="channel.id"
      :text="channel.name"
      @click="Addchannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
// 所有频道接口
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  // props验证 vue官方prop验证固定写法
  props: {
    userChannels: {
      // 数组类型
      type: Array,
      // 文档固定写法
      required: true
    }
  },
  data () {
    return {
      allChannels: []// 所有频道
    }
  },
  computed: {
    // 剩余的频道
    remainingChannels () {
      const channels = []// 定义剩余的频道
      const { allChannels, userChannels } = this
      allChannels.forEach(item => {
        // 当前的遍历项是否属于我的频道，如果不是，那就收集到 channels
        // userChannels 是否包含 item
        // find 会遍历数组，它会对每个元素执行 c.id === item.id 条件判定
        // 如果 true，则返回该元素，如果直到遍历结束都没有符合条件的元素，则返回 undefined
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    // 编辑添加频道
    Addchannel (channel) {
      this.userChannels.push(channel)
    }
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  padding-top: 40px;
  .channel-header {
    font-size: 16px;
    color: #333;
  }
  /deep/ .van-grid-item {
    width: 80px;
    height: 43px;
    .van-grid-item__content {
      background: #f4f5f6;
    }
    .van-grid-item__text {
      font-size: 14px;
      color: #222;
    }
  }
}
</style>
