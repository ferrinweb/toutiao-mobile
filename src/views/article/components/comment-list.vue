<template>
  <div class="comment-container">
    <van-cell title="全部评论" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        :comment="comment"
        v-for="(comment, index) in list"
        :key="index"
        @reply-comment="$emit('reply-comment', $event)"
      />
      <!-- <van-cell v-for="(comment, index) in list" :key="index" :title="comment.content" /> -->
    </van-list>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import { getComments } from '@/api/comment'
export default {
  name: 'CommentList',
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10 // 每页数据
    }
  },
  components: { CommentItem },
  props: {
    // 如果获取文章评论则传递文章Id如果获取评论回复,则传递评论Id
    source: {
      type: [String, Number, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getComments({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })
      // console.log(data)
      // 数据展示
      this.list.push(...data.data.results)
      this.$emit('com-total-count', data.data.total_count)
      // 关闭loading
      this.loading = false
      // 判断数据是否加载完
      if (data.results) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-container{
  background-color: #ffffff;
}
</style>
