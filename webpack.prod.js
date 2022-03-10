const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
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
          from: 'public/manifest.json',
        },
        {
          from: 'public/icons',
          to: 'icons',
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
    new HtmlWebpackPlugin({
      title: "jsweibo's password generator",
      favicon: 'public/favicon.png',
      filename: 'result.html',
      template: 'public/result.html',
      chunks: ['result'],
    }),
    new ESLintWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
});
