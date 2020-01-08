<template>

    <!-- 根路由出口 -->
<router-view></router-view>

</template>

<script>
// 这里使用@前面不需要加~

export default {
  name: 'App'
}
</script>

<style lang="less" scoped>

// 注意：在 style 中使用 @ (@别名就是src)别名，需要在前面加 ~
// @ 之后必须有 /
// 如果你加载的资源就是相对于当前目录，建议还是 ./
@import url("~@/styles/variables.less");

</style>
