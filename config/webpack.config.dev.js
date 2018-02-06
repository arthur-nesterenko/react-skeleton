'use strict';
const path = require('path');
const merge = require('lodash.mergewith');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const baseConfig = require('./webpack.config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const mergeCustomizer = require('./utils/merge-customizer');
const paths = require('./paths');

const publicPath = '/';

module.exports = merge(
  {
    entry: {
      main: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        require.resolve('react-error-overlay'),
      ],
    },

    output: {
      pathinfo: true,
      filename: 'static/js/bundle.js?[hash:15]',
      chunkFilename: 'static/js/[name].chunk.js',
      publicPath,
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },

    module: {
      rules: [
        // TODO: Disable require.ensure as it's not a standard language feature.
        // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
        // { parser: { requireEnsure: false } },

        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                formatter: eslintFormatter,
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: paths.appSrc,
        },

        // "url" loader works like "file" loader except that it embeds assets
        // smaller than specified limit in bytes as data URLs to avoid requests.
        // A missing `test` is equivalent to a match.
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        // Process JS with Babel.
        {
          test: /\.(js|jsx)$/,
          include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          options: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
          },
        },
      ],
    },

    devtool: 'cheap-module-source-map',

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'static/js/vendor.bundle.js?[hash:15]',
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
      }),
    ],
  },
  baseConfig,
  mergeCustomizer,
);
