<template>
  <div class="edit-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { editUserProfile } from '@/api/user'
export default {
  name: 'EditBirthday',
  data () {
    return {
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    // 确认提交
    async onConfirm () {
      // 显示加载中,并禁止背景点击
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      })
      const { data } = await editUserProfile({
        birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
      })
      // 告诉父组件关闭弹层
      this.$emit('close')
      // 告诉父组件更新视图
      this.$emit('input', data.data.birthday)
      // 提示更新成功
      this.$toast.success('修改成功')
    }
  }
}
</script>

<style scoped lang="less">

</style>
