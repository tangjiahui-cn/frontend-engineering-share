const htmlWebpackPlugin = require('html-webpack-plugin');
const { name: packageName } = require('./package.json');

function getCssLoaders () {
  return [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          mode: 'local',
          localIdentName: '[local]',
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
  ]
}

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devServer: {
    server: 'https',
    host: '0.0.0.0',
    port: 10000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    liveReload: false,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/home/api': {
        target: 'http://www.demo.com',
        // target: 'http://localhost:3000',
        // pathRewrite: {"/home/api": '/'},
        changeOrigin: true
      }
    }
  },
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    publicPath: process.env.__BUILD__ ? `/${packageName}/` : '/',
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
      },
      {
        test: /\.css$/,
        use: getCssLoaders()
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(),
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'react',
      template: './index.html'
    })
  ]
}