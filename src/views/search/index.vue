<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <van-search
    show-action
    v-model="searchText"
    class="search"
    placeholder="请输入搜索关键词"
    @search="isResultShow = true"
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
    />
    <!-- 搜索历史列表 -->
    <search-history
    v-else
    />
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false
    }
  },
  components: { SearchResult, SearchSuggestion, SearchHistory }
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
