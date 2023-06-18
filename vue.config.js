const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.168.27.251:26066',
        changeOrigin: true,
        pathRewrite: {'^/api':''}
      },
    }
  }
})
