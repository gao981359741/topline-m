<template>
  <div class="search-result">
          <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
    v-for="item in list"
    :key="item"
    :title="item"
  />
</van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      per_page: 20// 每页20
    }
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getSearch({
        page: this.page, // 页码
        per_page: this.per_page, // 每页大小
        q: this.q// 搜索关键字
      })
      // 2.将数据添加到列表
      const { results } = data.data

      // 3.关闭本次的loading
      // 4.判断是否还有数据
    }
  }
}
</script>

<style>

</style>
