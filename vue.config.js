module.exports = {
  configureWebpack: {
    resolve: {
      // 配置路径别名 @表示src文件夹
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  },
  publicPath: './'
}
