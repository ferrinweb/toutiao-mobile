<template>
  <div class="qa-container">
    <!-- 头部 -->
    <van-nav-bar
      title="问答"
      class="nav-bar"
    />
    <!-- 内容区域 -->
    <div class="container">
      <svg viewBox="0 0 1000 300">
        <symbol id="line-text">
          <text text-anchor="middle" x="50%" y="50%" dy=".4rem">
              开 发 中 ...
          </text>
        </symbol>
        <use xlink:href="#line-text" class="text"></use>
        <use xlink:href="#line-text" class="text"></use>
        <use xlink:href="#line-text" class="text"></use>
        <use xlink:href="#line-text" class="text"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QaIndex'
}
</script>

<style scoped lang="less">
* {
    padding: 0;
    margin: 0;
  }
body {
    background-color: rgb(41,45,62);
}
.container {
    font-size: 120px;
    font-weight: 700;
    text-transform: uppercase;
}
svg {
    position: absolute;
    width: 100%;
    height: 100%;
}
.text {
    fill: none;
    stroke-width: 5;
    stroke-dasharray: 0 240;
    stroke-dashoffset: 0;
    animation-delay: 1s;
}
.text:nth-child(4n + 1) {
    stroke: rgb(39,135,238);
    animation: text1 4s infinite;
}
.text:nth-child(4n + 2) {
    stroke: rgb(47,169,92);
    animation: text2 4s infinite;
}
.text:nth-child(4n + 3) {
    stroke: rgb(249,189,56);
    animation: text3 4s infinite;
}
.text:nth-child(4n + 4) {
    stroke: rgb(235,61,50);
    animation: text4 4s infinite;
}
@keyframes text1 {
    100% {
        stroke-dashoffset: 1000;
        stroke-dasharray: 60 180;
    }
}
@keyframes text2 {
    100% {
        stroke-dashoffset: 1060;
    stroke-dasharray: 60 180;
    }
}
@keyframes text3 {
    100% {
        stroke-dashoffset: 1120;
    stroke-dasharray:    60 180;
    }
}
@keyframes text4 {
    100% {
        stroke-dashoffset: 1180;
        stroke-dasharray: 60 180;
    }
}
</style>
