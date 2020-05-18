<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories', [])">全部删除  </span>
        <span @click="isDeleteShow=false"> 完成</span>
      </div>
      <div v-else @click="isDeleteShow=true"><van-icon name="delete" /></div>
    </van-cell>
    <van-cell
      :title="history"
      :key="index"
      v-for="(history, index) in searchHistorys"
      @click="onDelete(history, index)"
    >
    <van-icon v-if="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      isDeleteShow: false
    }
  },
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  methods: {
    onDelete (history, index) {
      // 删除历史当前这条历史记录
      if (this.isDeleteShow) {
        // 如果是删除状态才删除
        this.searchHistorys.splice(index, 1)
      } else {
        // 如果是非删除状态,需要展示搜索结果
        this.$emit('search', history)
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
