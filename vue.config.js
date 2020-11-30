const path = require('path')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV !== 'production'

const config = {
  lintOnSave: isDev,
  runtimeCompiler: true,
  devServer: {
    port: 8080,
    contentBasePublicPath: process.env.PUBLIC_PATH,
    proxy: {
      '/api': {
        target: 'http://localhost:3080/'
      },
      "/userapi": {
        target: 'http://localhost:3080/',
        pathRewrite: {'^/userapi' : '/api'}
      }
    },
    compress: true,
    watchOptions: {
      ignored: ['node_modules'],
      aggregateTimeout: 1000,
      poll: 1500
    },
  },

  css: { extract: true },

  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PUBLIC_PATH: JSON.stringify(process.env.PUBLIC_PATH),
        }
      })
    ],
    output: {
      filename: isDev ? '[name].[hash:8].js' : '[name].[contenthash:8].js',
      chunkFilename: isDev ? '[name].js' : '[name].[contenthash:8].js'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        /*
         * Отключен для поддержания работы в режиме источника компонент
         * Использовать @holder
         */
        '@src': path.resolve(__dirname, 'src'),
        assets: path.resolve(__dirname, 'src/assets')
      }
    }
  },
}

module.exports = config
