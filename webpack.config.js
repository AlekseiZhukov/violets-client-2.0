const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;


module.exports = {
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve( __dirname, 'src/index.js' ),
    output:{
        path: path.resolve( __dirname, 'build' ),
        filename: 'build.js'
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
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ],
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
    },


}