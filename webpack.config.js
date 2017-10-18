const Extract = require('extract-text-webpack-plugin');
//生成html，并且自动引入css和js html-webpack-plugin 
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    //配置入口文件,一个入口相当于一个页面
    //如果需要多页面，则要创建多个入口
    entry: {
        index: __dirname + '/muiltPageProjectDemo/pages/index.js',
        demo: __dirname + '/muiltPageProjectDemo/pages/demo.js',
        common: ['jquery',__dirname + '/muiltPageProjectDemo/common/index.js'],
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
            include: /muiltPageProjectDemo/,
            //加载器，
            loaders: ['babel-loader'],
        }, {
            test: /\.(css|scss)$/,
            // loaders: ['style-loader', 'css-loader']
            use: Extract.extract({
                fallback: "style-loader",
                use: [
                    {
                        loader:"css-loader",
                        options:{
                            minimize:true
                        }
                    }
                ]
            })
        }, { //jpg  jpeg
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name:'img/[name].[ext]'
                }
            }]
        },{
            test:/\.(eot|svg|ttf|woff|woff2)$/,
            use:[{
                
                loader:'file-loader',
                options:{
                    name:'css/fonts/[name].[ext]',
                }
            }]
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(), //只支持js压缩
        //使用webpack 插件，都必须在这里new出来
        new Extract("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            // name:'common.js',
            name: 'common',
            filename: 'js/common.js',

        }), //将webapck自带的模块化工具抽离出来，将公共模块抽取出来
        new htmlWebpackPlugin({
            // filename:'生成的html文件.html',
            filename: 'demo.html',
            title: 'demo',
            chunks: ['common', 'demo'], //一个chunk就是一个入口
            template: './template.html',
            minify: {
                html5: true
            }
        }),
        new htmlWebpackPlugin({
            // filename:'生成的html文件.html',
            filename: 'index.html',
            title: 'index',
            chunks: ['common', 'index'],
            template: './template.html',
            minify: {
                html5: true
            }
        })
    ]
}