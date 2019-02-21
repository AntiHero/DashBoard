const path = require('path');
const WebpackCleanPlugin = require('webpack-clean-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './assets/index.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build/',
  },
  node: {
    fs: 'empty'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 9999,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new WebpackCleanPlugin(['build']),
  ],
  devServer: {
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
};
