'use strict';
const path = require( 'path' );
const webpack = require( 'webpack' );
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const config = require( './config' );
const paths = require('./paths');
const getClientEnvironment = require('./env');


const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            paths.appIndexJs
        ],
        vendor: [
            'react',
        ],
    },

    output: {
        path: paths.appBuild,
    },

    module: {

        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 2,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                        },
                        'sass-loader',
                    ],
                }),
            },
        ],
    },

    resolve: {
        modules: ['node_modules', paths.appNodeModules].concat(
            // It is guaranteed to exist because we tweak it in `env.js`
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        extensions: ['*', '.js', '.jsx'],
    },

    plugins: [
        new InterpolateHtmlPlugin(env.raw),
        new webpack.DefinePlugin( {
            'process.env.SERVER_API'         : JSON.stringify( config.SERVER_API ),
            'process.env.PUBLIC_PATH'        : JSON.stringify( config.publicPath ),
        } ),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
       // new CopyWebpackPlugin([{ from: 'to-root' }]),

        // new AssetsPlugin({
        //     filename: 'assets.json',
        //     path: './tmp',
        // }),
    ],

};