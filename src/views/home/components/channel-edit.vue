
<template>
  <!-- 弹层组件    频道-->
  <div class="channel-edit">
    <!-- :border="false"  是否显示边框 -->
    <van-cell title="我的频道" :border="false">
        <!--type="danger"背景红色  -->
      <van-button size="mini" round type="danger">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
    </van-grid>
    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit'
}
</script>

<style lang='less' scoped>
.channel-edit {
  padding-top: 40px;
}
</style>
