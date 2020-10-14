const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: "eval-source-map",
  output: {
    filename: "./main.js",
    publicPath: '/',
    path: path.resolve(__dirname, "./html")
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/assets/images/icons/",
          to: "./assets/images/icons/[name].[ext]"
        },
        {
          from: "./src/map.html",
          to: "./[name].[ext]"
        },
        {
          from: "./src/assets/legacy/",
          to: "./assets/legacy/[name].[ext]"
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "./app.css"
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./assets/fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./assets/images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./html"),
    compress: true,
    port: 9000,
    watchContentBase: true,
    historyApiFallback: true,
    writeToDisk: false,
    progress: true,
    proxy: {
      '/api/**': {
        target: `https://test.openplacereviews.org/`,
        secure: false,
      }
    }
  }
};
