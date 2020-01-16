
<template>
  <!-- 弹层组件    频道-->
  <div class="channel-edit">
    <!-- :border="false"  是否显示边框 -->
    <van-cell title="我的频道" :border="false">
      <!--type="danger"背景红色  -->
      <!-- 我的频道 -->
      <van-button size="mini"
       round type="danger"
       @click="isEditShow = !isEditShow">
          {{ isEditShow ? '完成' : '编辑'}}
          </van-button>
    </van-cell>
    <van-grid :gutter="10" clickable>
      <van-grid-item v-for="(channel,index) in userChannels"
      :key="channel.id"
      @click="onUserChannelClick(index)"
      >
      <span slot="text"
      class="text"
      :class="{
            active: index === active
          }">{{channel.name}} </span>
        <van-icon slot="icon" name="close" v-show="isEditShow&&!index==0" />
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell class="channel-header" title="推荐频道" :border="false" />
    <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="channel in remainingChannels"
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
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEditShow: false// 默认叉号隐藏   编辑状态
    }
  },
  computed: {
    // 剩余的频道
    remainingChannels () {
      const channels = [] // 定义剩余的频道
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
    },
    onUserChannelClick (index) {
      // 如果是编辑状态，且下标不等于0，则执行删除操作
      if (this.isEditShow && index !== 0) {
        // splice  从所引处开始(包括索引本身)，删除指定的个数
        this.userChannels.splice(index, 1)
        // 如果是非编辑状态，则执行切换频道操作
      } else {
        this.$emit('switch', index)// switch切换
      }
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
    position: relative;
     .van-grid-item__icon-wrapper {
      position: absolute;
      top: -1px;
      right: 0px;
    }
    .van-grid-item__content {
      background: #f4f5f6;
    }
    .van-grid-item__text ,.text{
      font-size: 14px;
      color: #222;
    }
    .active{
        color: red
    }
  }
}
</style>
