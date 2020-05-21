<template>
  <div class="edit-user-gender">
    <van-picker
      show-toolbar
      title="性别"
      :columns="columns"
      :default-index="genderIndex"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'EditGender',
  data () {
    return {
      columns: ['男', '女'],
      genderIndex: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    // 确认修改
    async onConfirm () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      const { data } = await editUserProfile({
        gender: this.genderIndex
      })
      this.$emit('close')
      this.$emit('input', this.genderIndex)
      console.log(data)
      this.$toast.success('修改成功')
    },
    // 当值改变的时候
    onChange (picker, value, index) {
      this.genderIndex = index
    }
  }
}
</script>

<style scoped lang="less">

</style>
