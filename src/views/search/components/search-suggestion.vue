<template>
  <div class="search-suggestion">
    <van-cell
    icon="search"
    :title="suggestion"
    :key="index"
    v-for="(suggestion, index) in suggestionList"
    />
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestionList: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 要监视的数据名称
    searchText: {
      handler: async function () {
        // 当用户输入的内容改变时触发
        // 请求获取数据
        const { data: { data } } = await getSearchSuggestions(this.searchText)
        // 将数据传给data中
        this.suggestionList = data.options
      },
      immediate: true
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">

</style>
