const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

const jsEntry = './client/src/app.js';
const output = './client/.dist';
const bundleName = 'bundle'
const ENV = process.env.NODE_ENV;
const prettify = ENV === 'production';

module.exports = {
  entry: [jsEntry],
  output: {
    path: path.resolve(__dirname, output),
    filename: `${bundleName}.js`
  },
  optimization: {
    minimize: prettify
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
            prettify: prettify,
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
            minimize: prettify
          }
        }
      },
      {
        test: /\.(woff2|eot|ttf|otf|woff2|woff|mp3)$/,
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
      template: './client/src/index.html',
      favicon: './client/assets/fav0.png',
    })
  ]
}

if (ENV !== 'production') {
  module.exports.plugins.push(
    new PrerenderSPAPlugin({
      staticDir: 'prerender',
      registry: undefined,
      renderRoutes: ['/'],
      renderAfterTime: 5000,
      headless: false
    })
  );
}
