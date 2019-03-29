const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const jsEntry = './client/src/app.js';
const output = './client/.dist';
const bundleName = 'bundle'


const config = {
  entry: [jsEntry],
  output: {
    path: path.resolve(__dirname, output),
    filename: `${bundleName}.js`
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }, 
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: {
          loader: 'vue-loader',
          options: {
            prettify: false,
          }
        }
      },
      {
        test: /\.sass$/,
        use: [ 'vue-style-loader','css-loader', 'sass-loader' ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      },
      {
        test: /\.(woff2|eot|ttf|otf|woff2|woff)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    })
  ]
}

module.exports = config;
