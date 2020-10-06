var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: [
    './src/js/app.js', './src/scss/app.scss',
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
        options:{
          name: '../images/[name].[ext]',
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '../fonts/[name].[ext]',
        }
      },
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'html/js')
  },
  plugins: [
    new ExtractTextPlugin('../css/app.min.css'),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
          {from:'*.html',to:'../'},
          {from:'src/images',to:'../images/'},
          {from:'src/fonts',to:'../fonts/'},
      ]),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};
