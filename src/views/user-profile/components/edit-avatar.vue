<template>
  <div class="edit-avatar">
    <img
      :src="preImage"
      ref="img"
      class="avatar"
    />
    <van-nav-bar
      class="bottom-bar"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserProfile } from '@/api/user'
export default {
  name: 'EditAvatar',
  props: {
    file: {
      required: true
    }
  },
  data () {
    return {
      preImage: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      // 这里面是对裁切器的一些配置,最终设置成移动或者放大/缩小图片来裁切
      viewMode: 1, // 显示方式,设置1,防止拖拽出别的范围
      dragMode: 'move', // 图片移动来裁切
      aspectRatio: 1, // 裁切器的比例是1:1
      cropBoxMovable: false, // 禁止裁切器移动
      cropBoxResizable: false, // 禁止改变裁切器的大小
      background: false, // 去除裁切器的那个方框背景
      movable: true // 图片设置为可移动
    })
  },
  methods: {
    // 当点击右边的完成时触发
    async onClickRight () {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0
      })
      // 得到裁剪好的图片
      const newFile = await this.getCroppedCanvas()
      // 得到ForData对象
      const fd = new FormData()
      // 添加后端要求的字段
      fd.append('photo', newFile)
      // 发送请求更换头像
      await editUserProfile({ fd })
      // console.log(data)
      this.$emit('close')
      // 把裁剪好的头像传给父组件更新
      this.preImage = window.URL.createObjectURL(newFile)
      this.$emit('update-avatar', this.preImage)
      // 上传成功的提示
      this.$toast.success('上传成功')
    },
    // 获取裁剪好的图片
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(file => {
          resolve(file)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.edit-avatar{
  padding-top: 160px;
  .avatar{
    display: block;
    max-width: 100%;
  }
  .bottom-bar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    /deep/.van-nav-bar__text{
      color: #fff;
    }
  }
}
</style>
