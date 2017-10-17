const Extract = require('extract-text-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        app:__dirname + '/demo/app.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: /demo/,
            loaders: ['babel-loader'],
        }, {
            test: /\.(css|scss)$/,
            // loaders: ['style-loader', 'css-loader']
            use: Extract.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }]
    },
    plugins: [
        new Extract("styles.css"),
       // new webpack.optimize.CommonsChunkPlugin('common.js'),//将webapck自带的模块化工具抽离出来 
    ]
}