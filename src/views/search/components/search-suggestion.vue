<template>
  <div class="search-suggestion">
    <van-cell
    icon="search"
    :title="suggestion"
    :key="index"
    @click="$emit('search', suggestion)"
    v-for="(suggestion, index) in suggestionList"
    >
    <div slot="title" v-html="hilight(suggestion)"></div>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
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
      handler: debounce(async function () {
        // 当用户输入的内容改变时触发
        // 如果搜索框内容为空就不要触发了
        if (!this.searchText) {
          return
        }
        // 请求获取数据
        const { data: { data } } = await getSearchSuggestions(this.searchText)
        // 模板绑定,将数据传到data中
        this.suggestionList = data.options
      }, 300),
      immediate: true
    }
  },
  methods: {
    // 处理搜索关键字高亮
    hilight (suggestion) {
      const reg = new RegExp(this.searchText, 'gi')
      const activedText = `<span style="color:red">${this.searchText}</span>`
      return suggestion.replace(reg, activedText)
    }
  }
}
</script>

<style scoped lang="less">

</style>
