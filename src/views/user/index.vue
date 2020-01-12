<template>
<div class="user-container">
    <!-- left-arrow组件里的  箭头 -->
    <van-nav-bar left-arrow :title="user.name" @click-left='$router.back()'></van-nav-bar>
    <!-- 当前用户登录信息 -->
     <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image
          class="col1"
          fit="cover"
          round
          :src="user.photo"
        />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{user.art_count}}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{user.follow_count}}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{user.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{user.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <!-- 如果页面用户是当前登录用户，则显示编辑资料 -->
            <!-- 否则显示私信和关注 -->
            <van-button
              type="primary"
              size="small"
            >私信</van-button>
            <!-- <van-button
              type="default"
              size="small"
            >编辑资料</van-button> -->
             <van-button
              type="info"
              size="small"
            >关注</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>{{ user.certi }}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{ user.intro }}</span>
        </div>
      </div>
    </div>
    <!-- 文章列表 -->
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
    v-for="(article,index) in list"
    :key="index"
    :title="article.title"
  />
</van-list>

</div>
</template>

<script>
// 这里出现过错误，路径引错了，导致信息出不来
import { getUserById } from '@/api/user'
import { getArticlesByUser } from '@/api/article'
export default {
  name: 'UserPage',
  data () {
    return {
      user: {}, // 用户信息
      list: [], // 列表数据
      loading: false, // 控制上来加载更多的loading
      finished: false, // 控制是否加载结束了
      page: 1// 获取下一页数据的页码，默认第一页
    }
  },
  // 打开页面自动渲染，直接执行
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      try {
        // console.log(getUserById)
        const { data } = await getUserById(this.$route.params.userId)
        // console.log(data)

        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast('获取用户信息失败')
      }
    },
    async onLoad () {
      // 1.请求获取数据 通过用户id和分页参数
      const { data } = await getArticlesByUser(this.$route.params.userId, {
        page: this.page, // 可选的，默认是第一页
        per_page: 20// 默认每页10条
      })
      // 2.把数据添加到列表中
      // list []
      // data.data.results []
      // ...[1, 2, 3] 会把数组给展开，所谓的展开就是一个一个的拿出来
      const { results } = data.data
      this.list.push(...results)
      // 3.加载状态结束
      this.loading = false

      // 4.数据全部加载完成
      // 如果再请求 还有数据则执行
      if (results.length) {
        this.page++// 更新获取下一页数据的页码
      } else {
        this.finished = true// 没有数据了，不需要加载更多了
      }
    }

    // 组件里面的方法
    // onLoad () {
    //   // 请求获取数据
    //   setTimeout(() => {
    //     // 把数据添加到列表中
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 500)
    // }
  }

}
</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    >.row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      >.col1 {
        width: 80px;
        height: 80px;
      }
      >.col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 80%;
        height: 80px;
        padding: 0 12px;
        >.row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>
