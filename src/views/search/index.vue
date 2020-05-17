<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <van-search
    show-action
    v-model="searchText"
    class="search"
    placeholder="请输入搜索关键词"
    @search="onSearch(searchText)"
    @focus="isResultShow = false"
    @cancel="$router.back()"
    />
    <!-- 搜索结果列表 -->
    <search-Result
    v-if="isResultShow"
    :search-text="searchText"
    class="search-result"/>
    <!-- 搜索建议列表 -->
    <search-suggestion
    v-else-if="searchText"
    @search="onSearch"
    :search-text="searchText"
    />
    <!-- 搜索历史列表 -->
    <search-history
    v-else
    :search-historys="searchHistorys"
    />
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import { setItem, getItem } from '@/utils/storage'
import { mapState } from 'vuex'
import { getSearchHistories } from '@/api/search'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistorys: []
    }
  },
  components: { SearchResult, SearchSuggestion, SearchHistory },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadHistories()
  },
  methods: {
    onSearch (searchText) {
      // 搜索的时候
      // 传值给data中的searchText
      this.searchText = searchText
      // 判断下历史记录中有没有重复项
      const index = this.searchHistorys.indexOf(searchText)
      if (index !== -1) {
        this.searchHistorys.splice(index, 1)
      }
      // 将搜索的内容放到历史记录数组的最前项
      this.searchHistorys.unshift(searchText)
      // 将输入框的值存储到本地
      setItem('search-historys', this.searchHistorys)
      // 展示搜索结果
      this.isResultShow = true
    },
    async loadHistories () {
      // 获取搜索历史记录
      let searchHistorys = getItem('search-historys') || []
      if (this.user) {
        // 如果用户登录了,那么请求获取线上的历史记录并且和本地的数据合并
        const { data } = await getSearchHistories()
        searchHistorys = [...new Set([...searchHistorys, ...data.data.keywords])]
      }
      this.searchHistorys = searchHistorys
    }
  }
}
</script>

<style scoped lang="less">
.search-container{
  .search{
    background-color: #3296fa;
    .van-search__action{
      color: #ffffff;
    }
  }
  .search-list{
    position: fixed;
    top: 54px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
  }
}
</style>
