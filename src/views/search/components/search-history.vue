<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div>
        <span>全部删除  </span>
        <span> 完成</span>
      </div>
      <!-- <div><van-icon name="delete" /></div> -->
    </van-cell>
    <van-cell
    :title="history"
    :key="index"
    v-for="(history, index) in searchHistorys"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="less">

</style>
