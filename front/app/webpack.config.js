const htmlWebpackPlugin = require('html-webpack-plugin');
const { name: packageName } = require('./package.json');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devServer: {
    host: '0.0.0.0',
    port: 10001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    liveReload: false,
    hot: false,
    historyApiFallback: true,
  },
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    publicPath: process.env.__BUILD__ ? `/${packageName}/` : '/', // 这里打包后在测试环境作为入口地址路径。例如：/app
  },
  devtool: process.env.__BUILD__ ? undefined : 'source-map',
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'image/[hash]_[ext]_[query]'
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: packageName,
      template: './index.html'
    })
  ]
}