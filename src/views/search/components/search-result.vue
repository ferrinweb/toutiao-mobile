<template>
  <div class="search-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(result, index) in list" :key="index" :title="result.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false, // 控制loding的
      finished: false, // 控制加载完成的
      page: 1,
      perPage: 20
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    // 加载数据的处理函数
    async onLoad () {
      // 请求获取搜索结果
      const { data: { data } } = await getSearchResults({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })
      // 关闭loading效果
      this.loading = false
      // 将结果传给list并展示在模板中
      this.list.push(...data.results)
      // 判断数据是否加载完
      if (data.results) {
        this.page++ // 获取下一页的数据
      } else {
        this.finished = true // 没有数据了,那么加载状态设置成结束,不再onload
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
