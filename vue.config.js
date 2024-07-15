const { defineConfig } = require('@vue/cli-service')

const name = process.env.VUE_APP_TITLE || 'BLOG' // 网页标题

const port =  8080 // 端口
module.exports = defineConfig({
  publicPath: "/",
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: 'error',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  transpileDependencies: true,

})
