const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;


module.exports = {
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve( __dirname, 'src/index.js' ),
    output:{
        path: path.resolve( __dirname, 'build' ),
        filename: 'build.js',
        assetModuleFilename: "assets/[name]__[hash][ext][query]"
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                loader: 'ts-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [
                    NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                auto: /\.module\.\w+$/,
                                localIdentName: '[name]_[local]_[hash:base64:5]',
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/images',
                            name: '[name][hash:base64:5].[ext]'
                        }
                    }
                ],

            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack',
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/images',
                            name: '[name][hash:base64:5].[ext]'
                        }
                    }
                    ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/fonts',
                            name: '[name][hash:base64:5].[ext]'
                        }
                    }
                ],
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/favicon.ico'),
                    to: path.resolve(__dirname, 'build/favicon.ico')
                }
            ]
        })
    ].concat(NODE_ENV === 'production' ? [new MiniCssExtractPlugin()] : []),
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    devtool: "source-map",

}