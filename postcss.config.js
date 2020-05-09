// PostCss的配置文件
module.exports = {
  plugins: {
    // vue cli默认有这个autoprefixer配置，所以这个配置应该放到package.json或者.browserslistrc文件中
    // autoprefixer是自动添加浏览器前缀的插件
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8'], // 用来配置兼容的浏览器版本信息
    // },
    'postcss-pxtorem': {
      rootValue: 37.5, // 375/10得来的,分成10份,每份占37.5px
      // rootValue可设置根标签的字体大小,因为vant是基于375px的页面宽度写的,为了样式大小和vant保持一致,就写37.5,但是自己的设计稿是750px的,所以在测量的时候宽高都要除以2,缩小为原来的一半(相当于咱们也同样基于375px来写)
      propList: ['*']
      // propList设置可以从px转为rem的属性,*表示所有属性都转
    }
  }
}
