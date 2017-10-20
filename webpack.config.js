const Extract = require('extract-text-webpack-plugin');
//生成html，并且自动引入css和js html-webpack-plugin 
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const rootDir = "/learn-sass"
module.exports = {
    //配置入口文件,一个入口相当于一个页面
    //如果需要多页面，则要创建多个入口
    entry: {
        index: __dirname + `${rootDir}/pages/index/index.js`,
    },
    //配置输出
    output: {
        path: __dirname + '/dist2',
        filename: 'js/[name].js'
    },
    //配置模块打包和编译的规则  test   font-awesome
    module: {
        rules: [{
            test: /\.js$/,
            include: /learn-sass/,
            //加载器，
            loaders: ['babel-loader'],
        }, {
            test: /\.(css|scss)$/,

            use: Extract.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                }, {
                    loader: 'sass-loader'
                }]
            })
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            }]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [{

                loader: 'file-loader',
                options: {
                    name: 'css/fonts/[name].[ext]',
                }
            }]
        }]
    },

    plugins: [

        new Extract("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({

            name: 'common',
            filename: 'js/common.js',

        }),
        new htmlWebpackPlugin({

            filename: 'index.html',
            title: 'sass学习',
            template: './learn-sass/pages/index/index.html',
            minify: {
                html5: true
            }
        }),
    ]
}