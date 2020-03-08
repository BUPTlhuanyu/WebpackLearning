const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode : 'development',
    entry : {
        boundle:__dirname + '/main.js'
    },
    output : {
        filename : 'boundle.js',
        path: __dirname + '/dist'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './url-loader/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader', // 处理html中的图片，注意： vue中模版字符串以及react中jsx中的src是会被专用的loader专程require的形式，然后通过url-loader处理的。
                        options: {
                            attrs: ['img:src', 'img:data-src', 'audio:src']
                        }
                    }
                ] 
            }
        ]
    }
}