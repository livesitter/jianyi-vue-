
const BASE_URL =  '/';

// 引入node的path模块
const path = require('path')

// 输出路径方法
const resolve = dir => path.join(__dirname, dir)


module.exports = {
  lintOnSave: false,
  publicPath: BASE_URL,
  chainWebpack: config=>{
    config.resolve.alias
      // 在项目中可以用@替代src路径
      .set('@', resolve('src'))
      // 在项目中可以用_c替代src/components路径
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 跨域代理
  devServer: {
    proxy: 'http://localhoist:4000'
  }
}
