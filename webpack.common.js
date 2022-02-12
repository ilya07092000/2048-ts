const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = PATHS = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
};

module.exports = {
  entry: {
    index: PATHS.src + '/js/index.ts',
  },
  output: {
    path: PATHS.dist,
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.src + '/views/index.html',
      filename: PATHS.dist + '/views/index.html',
      chunks: ['index'],
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: PATHS.src + '/img/',
    //       to: 'img',
    //     },
    //   ],
    // }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.pug$/i,
      //   use: ['pug-loader'],
      // },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer()],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
