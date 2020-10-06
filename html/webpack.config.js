var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: [
    './src/js/app.js', './src/scss/app.scss'
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
          name: "../images/[name].[ext]",
        }
      },
      {
        test: /(ibmplexmono|!ibmplexsans)\/.*\.(eot|ttf|woff|woff2)$/,
          use: [
             {
                 loader: 'file-loader?name=../fonts/ibmplexmono/[name].[ext]'
             }
         ]
      },
      {
        test: /(ibmplexsans|!ibmplexmono)\/.*\.(eot|ttf|woff|woff2)$/,
          use: [
             {
                 loader: 'file-loader?name=../fonts/ibmplexsans/[name].[ext]'
             }
         ]
      }
    ]
  },
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist/')
  },
  plugins: [
    new ExtractTextPlugin('css/app.min.css'),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
          {from:'src/images',to:'images'},
          {from:'src/fonts',to:'fonts'},
      ]),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};
