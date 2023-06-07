const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
          target: 'http://localhost:3000', // to change before deployment to HEROKU!!!
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '' // rewrite url to remove the '/api' before calling server API 
          }
        }
    }
  }
})
