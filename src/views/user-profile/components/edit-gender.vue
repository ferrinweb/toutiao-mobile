<template>
  <div class="edit-user-gender">
    <van-picker
      show-toolbar
      title="性别"
      :columns="columns"
      :default-index="genderIndex"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
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
    onConfirm () {
      console.log('onConfirm')
    }
  }
}
</script>

<style scoped lang="less">

</style>
