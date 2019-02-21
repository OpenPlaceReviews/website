var path = require('path');

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: [
    './assets/js/app.js'
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
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
   output: {
    filename: './main.js',
    path: path.resolve(__dirname, 'assets/dist/js/')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}