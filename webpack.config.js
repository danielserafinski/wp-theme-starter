'use strict';
var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
		'bootstrap-loader',
		'./assets/src/js/app.ts'		
	],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/app.js'
    },
    devtool: 'source-map',
    module: {
        rules: [		
            {
                test: /\.js$/,
                use: 'source-map-loader'
			},
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
			{
				test: /\.(jpe?g|png)$/,
				use: [
					{
						loader: "url-loader",
						query: {
							limit: 10000,
							name: "images/[name]_[hash:6].[ext]"
						}	
						
					},
					{
						loader: 'image-webpack-loader',
						query: {
							mozjpeg: {
								progressive: true
							},
							gifsicle: {
								interlaced: false
							},
							optipng: {
								optimizationLevel: 4
							},
							pngquant: {
								quality: '75-90',
								speed: 3
							}
						}
					}					
				]
			},			
			{
				test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
				loader: 'imports-loader?jQuery=jquery'
			},
			{
				test: /\.(woff2?|svg)$/,
				use: [
					{
						loader: "url-loader",
						query: {
							limit: 10000,
							name: "graphics/[name]_[hash:6].[ext]"
						}	
						
					}
				]				
			},
			{
				test: /\.(ttf|eot)$/,
				use: [
					{
						loader: "url-loader",
						query: {
							limit: 10000,
							name: "fonts/[name]_[hash:6].[ext]"
						}	
						
					}
				]				
			}			

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),	
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        }),
        new CopyWebpackPlugin([
			{
				from: 'assets/src/static',
				to: 'static'
			}
        ])
    ]
};