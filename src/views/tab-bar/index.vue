<template>
<div class="tab-bar">
    <!-- 子路由出口 -->
<router-view></router-view>

<!-- 组件  -->
<!-- route开启路由模式 -->
<van-tabbar route>
  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
  <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
  <van-tabbar-item icon="user-o" to="/my">{{$store.state.user?'我的':'未登录'}}</van-tabbar-item>
</van-tabbar>
</div>

</template>

<script>
export default {

}
</script>

<style>

</style>
