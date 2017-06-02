'use strict';

const babel_options = {
    "presets": [
        "react", [ "es2015", { "modules": false } ], "es2016"
    ]
}

const config = {
    entry: "./source/javascript/react-app.tsx",
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
                test: /\.ts(x?)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babel_options
                    },
                    { loader: "ts-loader" }
                ]
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babel_options
                    }
                ]
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
    },
    resolve: {
        extensions: [ ".ts", ".tsx", ".js" ]
    }
}

module.exports = config
