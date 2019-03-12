const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
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
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            // eslint options (if necessary)
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract(['style-loader', 'css-loader'])
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [autoprefixer()]
                }
              },
              'sass-loader'
            ]
          })
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
      new ExtractTextPlugin({
        filename: `${bundleName}.css`,
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        title: 'Poc WebRTC',
        template: './client/src/index.html'
      })
    ]
  }

module.exports = config;
