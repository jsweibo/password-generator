const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
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
          from: 'public/icons',
          to: 'icons',
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
          from: 'public/result.html',
        },
        {
          from: 'public/manifest.json',
        },
        {
          from: 'public/sw.js',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "jsweibo's password generator",
      favicon: 'public/favicon.png',
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['index'],
    }),
    new ESLintWebpackPlugin(),
  ],
});
