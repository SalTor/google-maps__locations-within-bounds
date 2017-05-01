'use strict';

const config = {
    entry: "./source/javascript/react-app.js",
    output: {
        filename: "faker-data-map-bundle.js",
        path: __dirname + "/public/build/",
        publicPath: "build/"
    },
    devServer: {
        contentBase: "./public",
        historyApiFallback: true
    },
    devtool: "cheap-module-eval-source-map",
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["react", "es2015"]
                }
            },
            {
                test: /\.scss/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css/,
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            }
        ]
    }
}

module.exports = config
