const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    index: './src/index.extension.js',
  },
  output: {
    path: path.resolve(__dirname, 'extension'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/css',
          to: 'css',
        },
        {
          from: 'public/js',
          to: 'js',
        },
        {
          from: 'node_modules/clipboard/dist/clipboard.min.js',
          to: 'js',
        },
        {
          from: 'public/result.extension.html',
          to: 'result.html',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "jsweibo's password generator",
      favicon: 'public/favicon.png',
      filename: 'index.html',
      template: 'public/index.extension.html',
      chunks: ['index'],
    }),
    new ESLintWebpackPlugin(),
  ],
});
