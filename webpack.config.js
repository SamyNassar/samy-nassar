const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: {
    'main': './src/main.js'
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name][contenthash].js",
    clean: true
  },
  devtool: 'source-map',
  devServer:{
    static:{
        directory: path.resolve(__dirname, 'dist')
    },
    port:3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true, 
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ 
        filename: 'index.html',
        template: './src/index.html' }),
  ],
};
